import React from 'react'
import SelectField from '../Common/Input/SelectField'
import Button from '../Common/Button/Button'
import { fetchProfile } from '../store/slices/userSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { makeCapital } from '../helper/capitalName'
import SelectOption from '../Common/Input/SelectOption'
import LoaderButton from '../Common/Button/Loaderbutton'
const TeamManagement = ({ state, removeMember, changeRole }) => {
    const stateM = useSelector((state) => state.user);
    // const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(fetchProfile)
    // }, [])

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
                                        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-border rounded-full dark:bg-gray-600">
                                            <span className="font-bold text-white dark:text-gray-300">{element.enterprise.name.substring(0, 2)}</span>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4 pb-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {element.email}
                                    </td>
                                    <td className="px-6 py-4 pb-6">
                                        {element.enterprise.name}
                                    </td>
                                    <td className="px-6 py-4 pb-6">
                                        {element.phone_prefix} {element.phone}
                                    </td>
                                    <td className="px-6 py-4 pb-6">
                                        {
                                            element?.role && <span className="inline-block whitespace-nowrap rounded-full bg-sky px-4 py-1 text-center align-baseline text-sm font-bold leading-none text-heading">{makeCapital(element?.role)}</span>
                                        }
                                    </td>
                                    <td className="px-6 py-4 pb-6">
                                        <SelectOption
                                            onChange={(e) => changeRole(element.email, e.target.value)}
                                            value={element?.role}
                                            name="role"
                                            values={[{ name: 'Admin', value: 'ADMINISTRATOR' }, { name: 'Collaborator', value: 'MEMBER' }]}
                                            title={""}
                                            id={"role"}
                                            disabled={stateM?.data?.email === element.email}
                                            className="py-3"
                                        // error={returnErrorMessage("business_state")}
                                        />
                                    </td>

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