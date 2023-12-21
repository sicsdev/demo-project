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

const TeamManagement = ({ state, removeMember, changeRole }) => {
  const stateM = useSelector((state) => state.user);
  const [teams, setTeams] = useState(state?.data ?? []);
  const [perPage, setPerPage] = useState(10);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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

  const columns2 = [

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
    {
      name: "Email",
      id: "Email",
      selector: (row) => row?.email,
      cell: (row) =>
        <p className={`whitespace-normal text-xs truncate font-semibold my-1`}>{row.email}</p>,
      reorder: true,
      width: isMobile ? '220px' : '300px',
    },
    {
      name: "Name",
      id: "Name",
      selector: (row) => row?.name,
      cell: (row) => <p className="whitespace-normal text-xs">{row?.name}</p>,
      reorder: true,
      width: isMobile ? "100px" : "200px",
      hide: "sm",
    },
    {
      name: "Contact",
      id: "Contact",
      selector: (row) => row?.contact,
      cell: (row) => (
        <p className="whitespace-normal xs">
          {" "}
          {row?.contact !== "" && row?.contact !== " "
            ? formatPhoneNumber(row?.contact)
            : ""}
        </p>
      ),
      reorder: true,
      width: "200px",
      hide: "sm",
    },

    {
      name: "Role",
      id: " Role",
      selector: row => row?.role,
      cell: (element) => (
        <p className="whitespace-normal text-xs flex items-center" >{element.role == "MEMBER" ? "Member" : element.role == "COLLABORATOR" ? "Collaborator" : "Admin"}</p>
      ),
      // reorder: true,
      width: isMobile ? "120px" : "200px",
      hide: "",
    },

    {
      name: "Action",
      id: "Action",
      selector: (row) => row?.action,
      cell: (ele) => (
        <ButtonComponent ele={ele} show={show} setShow={setShow} removeMember={removeMember} changeRole={changeRole} role={ele.role} />
      ),
      reorder: true,
      width: "100px",
    },
  ];


  const data = ["ADMINISTRATOR", "Collaborator", "Remove"]
  const [show, setShow] = useState(null)
  return (
    <div className="mt-5">
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