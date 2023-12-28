import React, { useEffect, useRef } from "react";
import Button from "../Common/Button/Button";
import { useSelector } from "react-redux";
import { makeCapital } from "../helper/capitalName";
import SelectOption from "../Common/Input/SelectOption";
import DataTable from "react-data-table-component";
import { useState } from "react";
import { isMobile, mobileModel } from "react-device-detect";
import { EllipsisHorizontalIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { Tooltip } from 'react-tooltip'
import { getPermissionHelper } from "../helper/returnPermissions";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import EditProfileModal from "../SideModal/EditProfileModal";







const TeamManagement = ({ state, removeMember, changeRole }) => {
  const stateM = useSelector((state) => state.user);
  const [teams, setTeams] = useState(state?.data ?? []);
  const [perPage, setPerPage] = useState(10);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const userState = useSelector((state) => state.user.data)
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = () => {
    setShowModal(!showModal)
    console.log(showModal)
  }

  function addSpaceAfterPrefix(phoneNumber) {
    // Use a regular expression to add a space after '+1' if it exists
    return phoneNumber.replace(/(\+1)(\d+)/, '$1 $2');
  }

  useEffect(() => {
    if (state?.data) {
      const mapData = state?.data.map((ele) => {
        let contact = ele.phone;
        if (ele.phone_prefix && !ele.phone.includes('+1')) {
          contact = ele.phone_prefix.includes('+') ? ele.phone_prefix : '+' + ele.phone_prefix + " " + ele.phone;
        } else {
          contact = addSpaceAfterPrefix(ele.phone);
        }
        return {
          logo: ele?.enterprise?.logo,
          email: ele.email,
          name: ele.name,
          role: ele?.role,
          contact: contact,
        };
      });


      // Filter deflection team
      let filteredData = mapData.filter(member => !(member.email.endsWith('@deflection.ai')))
      setTeams(filteredData);

      // Remove Action for non-admin members.
      if (!getPermissionHelper('MANAGE TEAM', userState?.role)) {
        let newColumns = columns2.filter(column => column.name !== "Action")
        setColumns2(newColumns)
      }

    }


    const handleResize = () => { setIsMobile(window.innerWidth <= 768); };
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("resize", handleResize); };


  }, [state?.data]);

  function formatPhoneNumber(phoneNumber) {
    // Use regular expressions to extract the different parts of the phone number
    const countryCode = phoneNumber?.substring(0, 2);
    const areaCode = phoneNumber?.substring(3, 6);
    const firstPart = phoneNumber?.substring(6, 9);
    const secondPart = phoneNumber?.substring(9);
    const formattedNumber = `${countryCode} (${areaCode}) ${firstPart}-${secondPart}`;
    return formattedNumber;
  }

  const [columns2, setColumns2] = useState([

    // This logo column will be used for profile photo of the member in future.
    // {
    //   name: "Logo",
    //   id: "logo",
    //   selector: (row) => row?.logo,
    //   reorder: true,
    //   cell: (row) => (
    //     <>
    //       {row?.logo ? (
    //         <img
    //           className="w-9 h-9 rounded-lg border border-border"
    //           src={row?.logo}
    //           alt="user photo"
    //         />
    //       ) : (
    //         <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-[#E3AC2D] rounded-lg dark:bg-gray-600">
    //           <span className="font-medium text-white normal-case">
    //             {" "}
    //             {row?.name.charAt(0)}
    //           </span>
    //         </div>
    //       )}
    //     </>
    //   ),
    //   width: "80px",
    //   hide: "sm",
    // },
    // {
    //   name: "Email",
    //   id: "Email",
    //   selector: (row) => row?.email,
    //   cell: (row) =>
    //     <p className={`whitespace-normal text-xs truncate font-semibold my-1`}>{row.email}</p>,
    //   reorder: true,
    //   width: isMobile ? '220px' : '300px',
    // },
    {
      name: "Name",
      id: "Name",
      selector: (row) => row?.name,
      cell: (row) =>
        <div className="flex gap-3 items-center">
          {row.enterprise && row.enterprise[0]?.logo ? (
           // <div><img src={row.enterprise[0]?.logo} alt="Enterprise Logo" style={{ width: '40px', height: '40px', borderRadius: '50%' }}></img></div>) : <><div className="bg-soft-blue p-3 rounded-full text-white">YS</div></>}
          // <div>
            <p className="whitespace-normal text-xs font-semibold">{row?.name}</p>
            <p className="whitespace-normal text-xs">{row?.email}</p>
          </div>
        </div>,
      reorder: true,
      width: isMobile ? "100px" : "300px",
      hide: "sm",
    },
    // {
    //   name: "Contact",
    //   id: "Contact",
    //   selector: (row) => row?.contact,
    //   cell: (row) => (
    //     <p className="whitespace-normal xs">
    //       {" "}
    //       {row?.contact !== "" && row?.contact !== " "
    //         ? formatPhoneNumber(row?.contact)
    //         : ""}
    //     </p>
    //   ),
    //   reorder: true,
    //   width: "200px",
    //   hide: "sm",
    // },

    {
      name: "Permissions",
      id: "Permissions",
      selector: row => row?.role,
      cell: (element) => (
        <p className={`whitespace-normal text-white text-xs flex font-semibold items-center px-3 py-1 rounded-3xl ${element.role === "ADMINISTRATOR" && "bg-black"}`} >{element.role == "MEMBER" ? "Member" : element.role == "COLLABORATOR" ? "Administrator" : element.role == "ADMINISTRATOR" ? "Owner" : "Admin"}</p>
      ),
      // reorder: true,
      width: isMobile ? "120px" : "300px",
      hide: "",
    },
    {
      name: "Account Status",
      id: "Status",
      selector: (row) => row?.email,
      cell: (row) =>
        <p className={`whitespace-normal text-xs truncate font-semibold my-1`}>Active</p>,
      reorder: true,
      width: isMobile ? '220px' : '300px',
    },
    {
      name: "Action",
      id: "Action",
      selector: (row) => row?.action,
      cell: (ele) => (
        <><div className="flex gap-2 items-center justify-normal">
          <PencilSquareIcon className="h-6 w-6 text-gray-500" onClick={handleEditClick} />
          {ele.role === "ADMINISTRATOR" ?
            <TrashIcon className="h-6 w-6 text-gray" /> : <TrashIcon className="h-6 w-6 text-gray-500" />
          }
        </div></>
      ),
      reorder: true,
      width: "100px",
    },
  ])


  const data = ["ADMINISTRATOR", "Collaborator", "Remove"]
  const [show, setShow] = useState(null)
  return (
    <div className="mt-5 relative">
      <div className="w-full ">
        <DataTable
          title={""}
          fixedHeader
          highlightOnHover
          pointerOnHover
          defaultSortFieldId="number_of_messages"
          pagination
          className="h-[500px]"
          columns={columns2}
          noDataComponent={
            <>
              <p className="text-center text-xs p-3">!</p>
            </>
          }
          data={teams}
          paginationPerPage={perPage}
        />
      </div>
      {showModal ? <><EditProfileModal setShowModal={setShowModal} /> </> : ""}
    </div>
  );
};

export default TeamManagement;



export const ButtonComponent = ({ ele, show, setShow, removeMember, changeRole, role }) => {

  const data = [
    { name: "Set as Admin", value: "ADMINISTRATOR" },
    { name: "Set as Member", value: "MEMBER" },
    { name: "Set as Collaborator", value: "COLLABORATOR" }
  ]

  const divRef = useRef(null);
  useEffect(() => {
    // Function to handle clicks outside the div and dropdown
    function handleClickOutside(event) {
      if (divRef.current && !divRef.current.contains(event.target)) {
        // Clicked outside of the div, close the dropdown
        setShow(null);
      }
    }

    // Attach the event listener to the document body
    document.body.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className='cursor-pointer relative' ref={divRef} onClick={(e) => {
      setShow(prev => { if (prev === ele?.email) { return null } else { return ele?.email } })
    }}>
      <EllipsisHorizontalIcon className="h-6 w-6 font-bold text-heading cursor-pointer" />
      {show === ele?.email && (
        // <div className={`absolute top-[-57px] left-[-201px] sm:left-[-215 px]  z-10 bg-[#F8F8F8] divide-y divide-gray-100 min-w-[200px] border border-border rounded-lg shadow w-auto  `}>
        <div className={`absolute z-10 bg-[#F8F8F8] divide-y divide-gray-100 min-w-[150px] border border-border rounded-lg shadow w-auto left-[-120px] sm:left-0 md:left-0 lg:left-0`}>
          <ul className="py-2 text-xs text-gray-700 ">
            {data.map((element, key) =>
              element.value !== role &&
              <li className={`hover:bg-primary  hover:text-white text-heading my-1`} key={key}>
                <button type='button' className="block px-4 py-2 " onClick={() => {
                  changeRole(ele.email, element.value)
                  setShow(null)
                }}>{element.name}</button>
              </li>
            )}
            <li className={`hover:bg-danger  hover:text-white text-heading my-1`}>
              <button type='button' className="block px-4 py-2 " onClick={() => {
                removeMember(ele.email)
                setShow(null)
              }
              } >Remove</button>
            </li>

          </ul>
        </div>
      )
      }
    </div >
  )

}
