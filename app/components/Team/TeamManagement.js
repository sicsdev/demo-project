import React, { useEffect } from 'react'
import Button from '../Common/Button/Button'
import { useSelector } from 'react-redux'
import { makeCapital } from '../helper/capitalName'
import SelectOption from '../Common/Input/SelectOption'
import DataTable from 'react-data-table-component'
import { useState } from 'react'
import { isMobile, mobileModel } from 'react-device-detect'
const TeamManagement = ({ state, removeMember, changeRole }) => {
    const stateM = useSelector((state) => state.user);
    const [teams, setTeams] = useState(state?.data ?? [])
    const [perPage, setPerPage] = useState(10)
    useEffect(() => {

        if (state?.data) {
            const mapData = state?.data.map((ele) => {
                return {
                    logo: ele?.enterprise?.logo,
                    email: ele.email,
                    name: ele.enterprise.name,
                    role: ele?.role,
                    contact: ele.phone_prefix + " " + ele.phone
                }
            })
            setTeams(mapData)
        }
    }, [state?.data])

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
        {
            name: "Logo",
            id: "logo",
            selector: row => row?.logo,
            reorder: true,
            cell: (row) => (
                <>
                    {row?.logo ?
                        <img
                            className="w-9 h-9 rounded-lg border border-border"
                            src={row?.logo}
                            alt="user photo"
                        /> :
                        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-[#E3AC2D] rounded-lg dark:bg-gray-600">
                            <span className="font-medium text-white normal-case"> {row?.name.charAt(0)}</span>
                        </div >}</>
            ),
            width: "80px",
            hide: "sm"
        },
        {
            name: "Email",
            id: "Email",
            selector: row => row?.email,
            cell: (row) => (
                <p className='whitespace-normal text-xs'>{row.email}</p>
            ),
            reorder: true,

            width: "200px",

        },
        {
            name: "Name",
            id: "Name",
            selector: row => row?.name,
            cell: (row) => (
                <p className='whitespace-normal text-xs'>{row?.name}</p>
            ),
            reorder: true,
            width: isMobile ? "100px" : "200px",
            hide: "sm"
        },
        {
            name: "Contact",
            id: "Contact",
            selector: row => row?.contact,
            cell: (row) => (
                <p className='whitespace-normal xs'> {row?.contact !== '' && row?.contact !== ' ' ? formatPhoneNumber(row?.contact) : ''}</p>
            ),
            reorder: true,
            width: "200px",
            hide: "sm"
        },
        {
            name: "Role",
            id: "Role",
            selector: row => row?.role,
            cell: (element) => (
                <div className='flex justify-between gap-2 items-center'>
                    <span className="inline-block whitespace-nowrap rounded-full text-white bg-primary px-4 py-1 text-center align-baseline text-xs font-[500] leading-none ">{makeCapital(element?.role)}</span>


                </div>
            ),
            reorder: true,
            width: "150px",
            hide: "sm"
        },
        {
            name: "Action",
            id: "Action",
            selector: row => row?.action,
            cell: (element) => (
                <div className='gird grid-cols-1  sm:flex  justify-between gap-2 items-center w-full'>

                    {stateM?.data?.role === "ADMINISTRATOR" && stateM?.data?.email !== element.email && (
                        <div className=" w-[50%] sm:w-full ">
                            <SelectOption
                                onChange={(e) => changeRole(element.email, e.target.value)}
                                value={element?.role}
                                name="role"
                                values={[{ name: 'Admin', value: 'ADMINISTRATOR' }, { name: 'Collaborator', value: 'MEMBER' }]}
                                title={""}
                                id={"role"}

                                disabled={stateM?.data?.email === element.email || stateM?.data?.role !== "ADMINISTRATOR"}
                                className={stateM?.data?.email === element.email || stateM?.data?.role !== "ADMINISTRATOR" ? 'py-3 bg-none w-full' : 'py-3 w-full !text-[13px] gap-[2rem] '}
                            // error={returnErrorMessage("business_state")}
                            />
                        </div>
                    )}

                    {stateM?.data?.role === "ADMINISTRATOR" && stateM?.data?.email !== element.email ?
                        <div className=" w-[50%] sm:w-full my-3 sm:my-0">

                            < Button
                                type="button"
                                disabled=""
                                className="focus:outline-none font-normal rounded-md text-xs py-[9px] px-2 w-full focus:ring-yellow-300 text-black bg-[#ececf1] hover:text-white hover:bg-black "
                                onClick={() => removeMember(element.email)}
                            >
                                Remove
                            </Button>
                        </div>
                        : null
                    }
                </div>
            ),
            reorder: true,
            width: "300px"
        }

    ];




    const customStyles = {
        rows: {
            style: {
                minHeight: '70px', // override the row height
            },
        }
    };

    return (
        <div className="mt-5">

            <div className="w-full sm:block hidden" >
                <DataTable
                    title={''}
                    fixedHeader
                    highlightOnHover
                    pointerOnHover
                    defaultSortFieldId="number_of_messages"
                    pagination
                    className=''
                    columns={columns2}
                    noDataComponent={<><p className="text-center text-xs p-3">!</p></>}
                    data={teams}
                    paginationPerPage={perPage}
                />
            </div>


            <div className="block sm:hidden limiter">
                <div className="container-table100">
                    <div className="wrap-table100">
                        <div className="table100">
                            <table>
                                <thead>
                                    <tr className="table100-head">
                                        {columns2.map((item) => (
                                            <th className="column1  text-xs">{item.name}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>

                                    {teams.map((ele) =>
                                    (
                                        <>
                                            <tr>
                                                <td className="column1 text-sm">
                                                    {ele?.logo ?
                                                        <img
                                                            className="w-9 h-9 rounded-lg border border-border"
                                                            src={ele?.logo}
                                                            alt="user photo"
                                                        /> :
                                                        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-[#E3AC2D] rounded-lg dark:bg-gray-600">
                                                            <span className="font-medium text-white normal-case"> {ele?.name.charAt(0)}</span>
                                                        </div >}
                                                </td>
                                                <td className="column2 text-sm">
                                                    <p className='whitespace-normal text-xs'>{ele.email}</p>
                                                </td>
                                                <td className="column2 text-sm">
                                                    <p className='whitespace-normal text-xs'>{ele.name}</p>
                                                </td>
                                                <td className="column2 text-sm">
                                                    <p className='whitespace-normal text-xs'>{ele.contact}</p>
                                                </td>
                                                <td className="column2 text-sm">

                                                    <div className='flex justify-between gap-2 items-center'>
                                                        <span className="inline-block whitespace-nowrap rounded-full text-white bg-primary px-4 py-1 text-center align-baseline text-xs font-[500] leading-none ">{makeCapital(ele?.role)}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='gird grid-cols-1  sm:flex  justify-between gap-2 items-center w-full'>

                                                        {stateM?.data?.role === "ADMINISTRATOR" && stateM?.data?.email !== ele.email && (
                                                            <div className=" w-[50%] sm:w-full ">
                                                                <SelectOption
                                                                    onChange={(e) => changeRole(ele.email, e.target.value)}
                                                                    value={ele?.role}
                                                                    name="role"
                                                                    values={[{ name: 'Admin', value: 'ADMINISTRATOR' }, { name: 'Collaborator', value: 'MEMBER' }]}
                                                                    title={""}
                                                                    id={"role"}

                                                                    disabled={stateM?.data?.email === ele.email || stateM?.data?.role !== "ADMINISTRATOR"}
                                                                    className={stateM?.data?.email === ele.email || stateM?.data?.role !== "ADMINISTRATOR" ? 'py-3 bg-none w-full' : 'py-3 w-full !text-[13px] gap-[2rem] '}
                                                                // error={returnErrorMessage("business_state")}
                                                                />
                                                            </div>
                                                        )}

                                                        {stateM?.data?.role === "ADMINISTRATOR" && stateM?.data?.email !== ele.email ?
                                                            <div className=" w-[50%] sm:w-full my-3 sm:my-0">

                                                                < Button
                                                                    type="button"
                                                                    disabled=""
                                                                    className="focus:outline-none font-normal rounded-md text-xs py-[9px] px-2 w-full focus:ring-yellow-300 text-black bg-[#ececf1] hover:text-white hover:bg-black "
                                                                    onClick={() => removeMember(ele.email)}
                                                                >
                                                                    Remove
                                                                </Button>
                                                            </div>
                                                            : null
                                                        }
                                                    </div>
                                                </td>
                                            </tr >
                                        </>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        </div >
    )
}

export default TeamManagement