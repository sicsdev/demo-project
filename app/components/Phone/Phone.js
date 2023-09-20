import React from 'react'
import TextField from '../Common/Input/TextField'
import { useState } from 'react'
import { getAvailableMobileNumbers } from '@/app/API/components/PhoneNumber'
import { PhoneIcon } from '@heroicons/react/24/outline'
import SkeletonLoader from '../Skeleton/Skeleton'

const Phone = ({ basicFormData, setBasicFormData }) => {
    const [formValues, setFormValues] = useState({
        phone_number: basicFormData?.phone ?? '',
        area_code: basicFormData?.area_code ?? '',
        friendly_name: basicFormData?.friendly_name ?? '',
        phone_numbers: []
    })
    const [loading, setLoading] = useState(null)
    const handleInputValues = (event) => {
        const { value, name } = event.target
        setBasicFormData((prev) => {
            return {
                ...prev,
                [name]: value,
                phone_numbers: [],
                phone_number: '',
                area_code: '',
            }
        })
        setFormValues({
            ...formValues,
            phone_numbers: [],
            phone_number: '',
            area_code: '',
            [name]: value,
        })
        getPhoneNumbers(value)
    }
    const addPhone = (element) => {
        setBasicFormData((prev) => {
            return {
                ...prev,
                'phone_number': element.data,
                'friendly_name': element.name,
            }
        })
        setFormValues({
            ...formValues,
            ['phone_number']: element.data,
            ['friendly_name']: element.name
        })
    }
    const getPhoneNumbers = async (value) => {
        setLoading(true)
        const timeoutId = setTimeout(async () => {
            const response = await getAvailableMobileNumbers(value)
            if (response?.length > 0) {
                setBasicFormData((prev) => {
                    return {
                        ...prev,
                        ['phone_numbers']: response
                    }
                })
                setFormValues({
                    ...formValues,
                    'phone_numbers': response,
                    area_code: value
                }
                )

                setLoading(false)
            } else {
                setLoading(false)
            }
        }, 2000);
        return () => clearTimeout(timeoutId);
    }
    return (
        <>
            <div>
                <TextField
                    onChange={handleInputValues}
                    value={formValues.area_code}
                    name="area_code"
                    className="py-3 mt-1"
                    title={"Area Code"}
                    placeholder={"Please enter area code"}
                    type={"number"}
                    id={"area_code"}
                    error={''}
                // onBlur={() => { getPhoneNumbers() }}
                />
            </div>
            {loading === true ?
                <SkeletonLoader count={10} height={30} width={"100%"} />
                :
                <>
                    {formValues?.phone_numbers?.length > 0 && (formValues.phone_number === '' || formValues.phone_number === undefined) && (
                        <div className="relative overflow-x-auto my-2">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-heading uppercase bg-gray ">
                                    <tr>
                                        <th scope="col" className="px-3 py-2">
                                            Number
                                        </th>
                                        <th scope="col" className="px-3 py-2">
                                            Region
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formValues.phone_numbers && formValues?.phone_numbers.slice(0, 10).map((element, key) =>
                                        <tr className={` border-b border-border  hover:bg-heading hover:text-white cursor-pointer`} key={key} onClick={(e) => {
                                            addPhone(element)
                                        }} >
                                            <th scope="row" className="px-3 py-2 font-normal  whitespace-nowrap text-[12px]">
                                                {element.name}
                                            </th>
                                            <td className="px-3 py-2 font-normal whitespace-nowrap text-[12px]">
                                                {element.region}
                                            </td>
                                        </tr>
                                    )}
                                    {formValues.phone_numbers && formValues?.phone_numbers.length === 0 && (
                                        <p className='text-danger'> No data found please try a new area code.</p>
                                    )}
                                </tbody>
                            </table>
                        </div>



                    )}
                </>}
            {formValues.phone_number && formValues.friendly_name && (
                <div className='my-2 cursor-pointer'  >
                    <div className='rounded-lg p-4 shadow-md flex justify-start gap-4 items-center border border-border '>
                        <PhoneIcon className="h-5 w-4 text-heading" />
                        <span className='text-heading text-xs'>{formValues.friendly_name}</span>
                    </div>
                </div>
            )}
        </>
    )
}

export default Phone