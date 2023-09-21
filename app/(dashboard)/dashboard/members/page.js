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
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { changeRole, fetchMembers, removeMember } from "@/app/components/store/slices/memberSlice";
import Loading from "@/app/components/Loading/Loading";
import Invite from "@/app/components/Invite/Invite";
import TeamManagement from "@/app/components/Team/TeamManagement";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import TopBar from "@/app/components/Common/Card/TopBar";
import SideModal from "@/app/components/SideModal/SideModal";

const Page = () => {
  const [teamModal, setTeamModal] = useState(false);
  const state = useSelector((state) => state.members);

  const dispatch = useDispatch();
  const getMembersData = () => {
    dispatch(fetchMembers());
  };
  useEffect(() => {
    getMembersData();
  }, []);

  const handleRemoveMember = (email) => {
    dispatch(removeMember({ email }));
  }

  const handleChangeRole = (email, role) => {
    dispatch(changeRole({ email, role }))
  }


  return (
    <div style={{ whiteSpace: "normal" }}>
      <TopBar title={`Team`} icon={<UserGroupIcon className="h-5 w-5 text-primary" />} />
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
        <div className="block sm:flex md:flex lg:flex justify-between items-center my-2">
          <div>
            <h3 className="font-bold text-heading text-sm">Manage Team</h3>
            <p className="text-heading font-normal text-xs">
              Invite and manage team members to your account.
            </p>
          </div>
          <div>
            <Button
              type={"button"}
              onClick={(e) => {
                setTeamModal(true);
              }}
              className="my-3 sm:my-0 md:my-0 lg:my-0 inline-block font-bold rounded bg-primary px-8 pb-2 pt-2 text-xs   leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
            >
              Invite Team Member
            </Button>
          </div>
        </div>
      }

      {state?.isLoading === true ? (
        <SkeletonLoader count={9} height={30} className={"mt-2"} />
      ) : (
        <TeamManagement state={state} removeMember={handleRemoveMember} changeRole={handleChangeRole} />
      )}

      {teamModal ? (
        <>
          <SideModal setShow={setTeamModal} heading={'Invite Team Member'} border={false}>
            <Invite setTeamModal={setTeamModal} />
          </SideModal>

          {/* // <Modal
        //   title={"Invite Team Member"}
        //   show={teamModal}
        //   setShow={setTeamModal}
        //   className={"text-center w-[80%] rounded-lg"}
        //   showCancel={true}
        // > */}
          {/* // </Modal> */}
        </>
      ) : (
        ""
      )
      }
    </div >
  );
};

export default Page;
