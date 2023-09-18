import React, { useEffect } from 'react'
import Button from '../Common/Button/Button'
import { useSelector } from 'react-redux'
import { makeCapital } from '../helper/capitalName'
import SelectOption from '../Common/Input/SelectOption'
import DataTable from 'react-data-table-component'
import { useState } from 'react'
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
            width: "80px"
        },
        {
            name: "Email",
            selector: row => row?.email,
            cell: (row) => (
                <p className='whitespace-normal'>{row.email}</p>
            ),
            reorder: true,

            width: "200px"

        },
        {
            name: "Name",
            selector: row => row?.name,
            cell: (row) => (
                <p className='whitespace-normal'>{row?.name}</p>
            ),
            reorder: true,
            width: "200px"
        },
        {
            name: "Contact",
            selector: row => row?.contact,
            cell: (row) => (
                <p className='whitespace-normal'> {row?.contact !== '' && row?.contact !== ' ' ? formatPhoneNumber(row?.contact) : ''}</p>
            ),
            reorder: true,
            width: "200px"
        },
        {
            name: "Role",
            selector: row => row?.role,
            cell: (element) => (
                <div className='flex justify-between gap-2 items-center'>
                    <span className="inline-block whitespace-nowrap rounded-full text-white bg-primary px-4 py-1 text-center align-baseline text-xs font-[500] leading-none ">{makeCapital(element?.role)}</span>


                </div>
            ),
            reorder: true,

            width: "150px"
        },
        {
            name: "Action",
            selector: row => row?.action,
            cell: (element) => (
                <div className='flex justify-between gap-2 items-center w-full'>

                    {stateM?.data?.role === "ADMINISTRATOR" && stateM?.data?.email !== element.email && (
                        <div className=" w-full">
                            <SelectOption
                                onChange={(e) => changeRole(element.email, e.target.value)}
                                value={element?.role}
                                name="role"
                                values={[{ name: 'Admin', value: 'ADMINISTRATOR' }, { name: 'Collaborator', value: 'MEMBER' }]}
                                title={""}
                                id={"role"}
                                disabled={stateM?.data?.email === element.email || stateM?.data?.role !== "ADMINISTRATOR"}
                                className={stateM?.data?.email === element.email || stateM?.data?.role !== "ADMINISTRATOR" ? 'py-3 bg-none w-full' : 'py-3 w-full'}
                            // error={returnErrorMessage("business_state")}
                            />
                        </div>
                    )}

                    {stateM?.data?.role === "ADMINISTRATOR" && stateM?.data?.email !== element.email ?
                        < Button
                            type="button"
                            disabled=""
                            className="focus:outline-none font-normal rounded-md text-xs py-[9px] px-2 w-full focus:ring-yellow-300 text-black bg-[#ececf1] hover:text-white hover:bg-black"
                            onClick={() => removeMember(element.email)}
                        >
                            Remove
                        </Button>
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

            <div className="w-full" >
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
        </div >
    )
}

export default TeamManagement