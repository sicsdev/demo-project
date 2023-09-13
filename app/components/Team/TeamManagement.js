import React from 'react'
import Button from '../Common/Button/Button'
import { useSelector } from 'react-redux'
import { makeCapital } from '../helper/capitalName'
import SelectOption from '../Common/Input/SelectOption'
const TeamManagement = ({ state, removeMember, changeRole }) => {
    const stateM = useSelector((state) => state.user);

    return (
        <div className="mt-5">
            <div className="relative overflow-x-auto sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <tbody>
                        {state?.data &&
                            state?.data?.map((element, key) => (
                                <tr
                                    className=" border-b border-border dark:bg-gray-800 dark:border-gray-700"
                                    key={key}
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {element?.enterprise?.logo ?
                                            <img
                                                className="w-9 h-9 rounded-lg border border-border"
                                                src={element?.enterprise?.logo}
                                                alt="user photo"
                                            /> : 
                                            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-[#E3AC2D] rounded-lg dark:bg-gray-600">
                                                <span className="font-medium text-white normal-case"> {element?.enterprise?.name.charAt(0)}</span>
                                            </div >}
                                    </th>
                                    <td className="px-6 py-4 pb-6 font-400 text-sm whitespace-nowrap dark:text-white">
                                        {element.email}
                                    </td>
                                    <td className="px-6 py-4 pb-6 text-sm">
                                        {element.enterprise.name}
                                    </td>
                                    <td className="px-6 py-4 pb-6 w-[200px] text-sm">
                                        {element.phone_prefix + " " + element.phone}
                                    </td>
                                    <td className="px-6 py-4 pb-6 text-sm">
                                        {
                                            element?.role && <span className="inline-block whitespace-nowrap rounded-full text-white bg-primary px-4 py-1 text-center align-baseline text-xs font-[500] leading-none ">{makeCapital(element?.role)}</span>
                                        }
                                    </td>
                                    {stateM?.data?.role === "ADMINISTRATOR" && stateM?.data?.email !== element.email && (
                                        <td className="px-6 py-4 pb-6">
                                            <SelectOption
                                                onChange={(e) => changeRole(element.email, e.target.value)}
                                                value={element?.role}
                                                name="role"
                                                values={[{ name: 'Admin', value: 'ADMINISTRATOR' }, { name: 'Collaborator', value: 'MEMBER' }]}
                                                title={""}
                                                id={"role"}
                                                disabled={stateM?.data?.email === element.email || stateM?.data?.role !== "ADMINISTRATOR"}
                                                className={stateM?.data?.email === element.email || stateM?.data?.role !== "ADMINISTRATOR" ? 'py-3 bg-none' : 'py-3'}
                                            // error={returnErrorMessage("business_state")}
                                            />
                                        </td>)}

                                    <td className="px-6 py-4 pb-6">
                                        {stateM?.data?.role === "ADMINISTRATOR" && stateM?.data?.email !== element.email ?
                                            < Button
                                                type="button"
                                                disabled=""
                                                className="focus:outline-none font-normal rounded-md text-sm py-2.5 px-2 w-full focus:ring-yellow-300 text-black bg-[#ececf1] hover:text-white hover:bg-black"
                                                onClick={() => removeMember(element.email)}
                                            >
                                                Remove
                                            </Button>
                                            : null
                                        }
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default TeamManagement