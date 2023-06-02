import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Button from "../Common/Button/Button";
import TextField from "../Common/Input/TextField";
import SelectField from "../Common/Input/SelectField";
import { business_company_size_data, business_industry_data, ecommerce_platform_data } from "./data/FormData";
import { createEnterpriseAccount } from "@/app/API/pages/EnterpriseService";
import { useState } from "react";

const schema = yup.object({
    business_address: yup.string().required(),
    business_industry: yup.string().required(),
    business_name: yup.string().required(),
    ecommerce_platform: yup.string().required(),
    business_company_size: yup.string().required(),
}).required();

export default function BasicDetails({ basicFormData, setBasicFormData, setIntakeStep, form = true, setIsEdit }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    console.log(basicFormData)
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            business_address: basicFormData?.business_address ? basicFormData.business_address : '',
            business_industry: basicFormData?.business_industry ? basicFormData.business_industry : '',
            business_name: basicFormData?.business_name ? basicFormData.business_name : '',
            ecommerce_platform: basicFormData?.ecommerce_platform ? basicFormData.ecommerce_platform : '',
            business_company_size: basicFormData?.business_company_size ? basicFormData.business_company_size : '',
        },
        resolver: yupResolver(schema)
    });
    console.log(errors)
    const onSubmit = async (data) => {
        setLoading(true)
        let payload = {
            "name": data.business_name,
            "country": "US",
            "address": data.business_address,
            "industry": data.business_industry,
            "company_size": data.business_company_size,
            "ecommerce_platform": data.ecommerce_platform
        }
        const createEnterprise = await createEnterpriseAccount(payload)

        if (form === true) {
            if (createEnterprise?.status === 201) {
                setBasicFormData(data)
                setIntakeStep(1)
                setError(null)
                setLoading(false)
            } else {
                setError(createEnterprise.message)
                setLoading(false)
            }
        } else {
            if (createEnterprise?.status === 201) {
                setBasicFormData(data)
                setIsEdit(true)
                setLoading(false)
            }
        }
    };
    return (
        <div>
            <form className=' block sm:grid md:grid lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 p-5 gap-1' onSubmit={handleSubmit(onSubmit)}>
                <TextField title={'Business Address'} register={register("business_address")} error={errors.business_address} placeholder={"Business Address"} type={'text'} id={"business_address"} />
                <TextField title={'Business Name'} register={register("business_name")} error={errors.business_name} placeholder={"Business Name"} type={'text'} id={"business_name"} />
                <SelectField values={business_industry_data} register={register("business_industry")} title={"Business Industry"} id={'business_industry'} error={errors.business_industry} className="py-3" />
                <SelectField values={business_company_size_data} register={register("business_company_size")} title={"Business Company Size"} id={'business_company_size'} error={errors.business_company_size} className="py-3" />
                <SelectField values={ecommerce_platform_data} register={register("ecommerce_platform")} title={"Ecommerce Platform"} id={'ecommerce_platform'} error={errors.ecommerce_platform} className="py-3" labelClassName={'col-span-2'} />
                {error && (<span className="text-xs text-danger col-span-2 mt-2 text-center">{error}</span>)}
                <div className="flex col-span-2 items-center justify-end p-2 rounded-b">
                    <Button type={"submit"}
                        className="inline-block float-right rounded bg-voilet px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                        disabled={loading ? true : false}
                    >
                        {loading ? 'Loading...' : form === true ? 'Next' : 'Submit'}

                    </Button>
                </div>
            </form>
        </div>
    );
}