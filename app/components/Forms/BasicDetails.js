import TextField from "../Common/Input/TextField";
import SelectField from "../Common/Input/SelectField";
import { business_company_size_data, business_industry_data, state_data } from "./data/FormData";
import { useState } from "react";

export default function BasicDetails({ basicFormData, setBasicFormData, }) {
    const [errors, setErrors] = useState([])
    const [formValues, setFormValues] = useState({
        business_street: basicFormData?.business_street ?? '',
        business_city: basicFormData?.business_city ?? '',
        business_state: basicFormData?.business_state ?? '',
        business_zipcode: basicFormData?.business_zipcode ?? '',
        business_industry: basicFormData?.business_industry ?? '',
        business_name: basicFormData?.business_name ?? '',
        ecommerce_platform: basicFormData?.ecommerce_platform ?? '',
        business_company_size: basicFormData?.business_company_size ?? '',
        business_unit_no: basicFormData?.business_unit_no ?? '',
    })
    const makeCapital = (str) => {
        if (str.includes(" ")) {
            return str
                .split(" ")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
        } else {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    }
    const handleInputValues = (e) => {
        setFormValues({ ...formValues, [e.target.name]: makeCapital(e.target.value) })
        debugger
        setBasicFormData((prev) => {
            return {
                ...prev,
                [e.target.name]: makeCapital(e.target.value)
            }
        })

    }


    const provideStateNames = () => {
        return state_data.map((state) => state.name)
    }




    const returnErrorMessage = (key) => {
        if (errors.length) {
            const findErr = errors.find((x) => x.field === key)
            if (findErr) {
                return findErr.message
            }
        }
        return null
    }
    return (
        <div >
            <span className="text-sm my-5 text-[#808080]">
                Please provide us with some important information about your business.
            </span>

            {/* Step 1 */}
            <div className='mt-3'>
                <>

                    <TextField onChange={handleInputValues} value={formValues.business_name} name='business_name' className='py-3 mt-1' title={'Business Name'} placeholder={"Business Name"} type={'text'} id={"business_name"} error={returnErrorMessage("business_name")} />
                    <br />
                    <h3 className="text-heading mb-4 font-semibold">Business Address</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        <TextField onChange={handleInputValues} value={formValues.business_street} name='business_street' className='py-3 mt-1' title={'Street Address'} placeholder={"Please enter Street Address"} type={'text'} id={"business_street"} error={returnErrorMessage("business_street")} />
                        <TextField onChange={handleInputValues} value={formValues.business_city} name='business_city' className='py-3 mt-1' title={'City'} placeholder={"Please enter city"} type={'text'} id={"business_city"} error={returnErrorMessage("business_city")} />
                        <SelectField onChange={handleInputValues} value={formValues.business_state} name='business_state' values={provideStateNames()} title={"State"} id={'business_state'} className="py-3" error={returnErrorMessage("business_state")} />
                        <div className="">
                            <TextField onChange={handleInputValues} value={formValues.business_zipcode} name='business_zipcode' className='py-3 mt-1' title={'Zipcode'} placeholder={"Zipcode"} type={'text'} id={"business_zipcode"} error={returnErrorMessage("business_zipcode")} />
                        </div>
                        <div className="md:col-span-2">
                            <TextField onChange={handleInputValues} value={formValues.business_unit_no} name='business_unit_no' className='py-3 mt-1' title={'Unit No.'} placeholder={"Unit No. (optional)"} type={'text'} id={"business_unit_no"} error={returnErrorMessage("business_unit_no")} />
                        </div>
                        <SelectField onChange={handleInputValues} value={formValues.business_company_size} name='business_company_size' values={business_company_size_data} title={"Business Company Size"} id={'business_company_size'} className="py-3" error={returnErrorMessage("business_company_size")} />
                        <SelectField onChange={handleInputValues} value={formValues.business_industry} name='business_industry' values={business_industry_data} title={"Business Industry"} id={'business_industry'} className="py-3" error={returnErrorMessage("business_industry")} />
                    </div>
                </>





            </div>




        </div>
    );
}