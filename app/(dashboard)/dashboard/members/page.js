"use client";
import Button from "@/app/components/Common/Button/Button";
import { Input } from "@/app/components/Common/Input/Input";
import Modal from "@/app/components/Common/Modal/Modal";
import React, { useEffect, useState } from "react";
import {
  XMarkIcon,
  UserGroupIcon,
  ClockIcon,
  Cog6ToothIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { changeRole, fetchMembers, removeMember } from "@/app/components/store/slices/memberSlice";
import Loading from "@/app/components/Loading/Loading";
import Invite from "@/app/components/Invite/Invite";
import TeamManagement from "@/app/components/Team/TeamManagement";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import TopBar from "@/app/components/Common/Card/TopBar";
import SideModal from "@/app/components/SideModal/SideModal";
import { getPermissionHelper } from "@/app/components/helper/returnPermissions";

const Page = () => {
  const [teamModal, setTeamModal] = useState(false);
  const state = useSelector((state) => state.members);
  const userState = useSelector((state) => state.user.data)
  const dispatch = useDispatch();
  const getMembersData = () => {
    dispatch(fetchMembers());
  };

  useEffect(() => {
    if (state.data === null) {
      dispatch(fetchMembers());
    }
  }, [state.data]);
  const handleRemoveMember = (email) => {
    dispatch(removeMember({ email }));
  }

  const handleChangeRole = (email, role) => {
    dispatch(changeRole({ email, role }))
  }


  return (
    <div style={{ whiteSpace: "normal" }}>
      {/* <TopBar title={`Team`} icon={<UserGroupIcon className="h-6 w-6 text-primary" />} /> */}
      {state?.isLoading === true ? <div className='my-4'>
        <div className='block sm:flex md:flex lg:flex justify-between items-center my-2'>
          <div>
            <SkeletonLoader count={1} height={20} width={80} />
            <SkeletonLoader count={1} height={10} width={300} />
          </div>
          <div>
            <SkeletonLoader count={1} height={40} width={200} />
          </div>
        </div>
      </div> :
        <div className="block flex sm:flex md:flex lg:flex justify-between items-center mt-5 pt-5 mx-0 lg:mx-3 md:mx-3">
          <div className=''>
            {/* <h3 className="font-bold text-heading text-md flex gap-2 items-center"><UserGroupIcon className='w-5 h-5'></UserGroupIcon> Manage Team</h3> */}
            <div className='flex gap-2 items-center'>
              <UserGroupIcon className='w-5 h-5'></UserGroupIcon><TopBar title={`Manage Team`} />
            </div>

            <p className="text-heading font-normal text-xs mt-2">
              Invite and manage team members to your account.
            </p>
          </div>
          {getPermissionHelper('INVITE TEAM MEMBER', userState?.role) && <div>
            <Button
              type={"button"}
              onClick={(e) => {
                setTeamModal(true);
              }}
              className="my-3 sm:my-0 md:my-0 lg:my-0 inline-block font-bold rounded bg-primary lg:px-8 pb-2 px-2 pt-2 text-xs leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
            >
              Invite Team Member
            </Button>
          </div>}
        </div>
      }

      <div className='lg:mt-5 pt-1'></div>

      {state?.isLoading === true ? (
        <SkeletonLoader count={9} height={30} className={"mt-2"} />
      ) : (
        <div className='mx-0 lg:mx-3 md:mx-1'>
          <TeamManagement state={state} removeMember={handleRemoveMember} changeRole={handleChangeRole} />
        </div>
      )}

      {teamModal ? (
        <>
          <SideModal setShow={setTeamModal} heading={<p className="flex justify-start items-center gap-2">  <span
            className="text-[#b3b3b3] cursor-pointer"
            onClick={() => setTeamModal(false)}
          >
            <svg width="18" height="18" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" class=""><path d="M6.99951 9L3.99994 6L6.99951 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          </span>Invite Team Member</p>} border={false}>
            <Invite setTeamModal={setTeamModal} />
          </SideModal>
        </>
      ) : (
        ""
      )
      }
    </div >
  );
};

export default Page;
