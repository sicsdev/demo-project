import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Button from "../Common/Button/Button";
import TextField from "../Common/Input/TextField";

const schema = yup.object({
    business_address: yup.string().required(),
    business_industry: yup.string().required(),
    business_name: yup.string().required(),
    ecommerce_platform: yup.string().required(),
    business_company_size: yup.number().positive().integer().required(),
}).required();

export default function BasicDetails({ formData, setFormData, intakeStep, setIntakeStep }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            business_address: '',
            business_industry: '',
            business_name: '',
            ecommerce_platform: '',
            business_company_size: '',
        },
        resolver: yupResolver(schema)
    });
    console.log(errors)
    const onSubmit = (data) => {
        setFormData(data)
        setIntakeStep(1)
    };
    return (
        <form className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 p-5 gap-1' onSubmit={handleSubmit(onSubmit)}>
            <TextField title={'Business Address'} register={register("business_address")} error={errors.business_address} placeholder={"Business Address"} type={'text'} id={"business_address"} />
            <TextField title={'Business Name'} register={register("business_name")} error={errors.business_name} placeholder={"Business Name"} type={'text'} id={"business_name"} />
            <TextField title={'Business Industry'} register={register("business_industry")} error={errors.business_industry} placeholder={"Business Industry"} type={'text'} id={"business_industry"} />
            <TextField title={'Business Company Size'} register={register("business_company_size")} error={errors.business_company_size} placeholder={"Business Company Size"} type={'text'} id={"business_company_size"} />
            <TextField title={'Ecommerce Platform'} labelClassName={'col-span-2'} register={register("ecommerce_platform")} error={errors.ecommerce_platform} placeholder={"Ecommerce Platform"} type={'text'} id={"ecommerce_platform"} />
            <div className="flex col-span-2 items-center justify-end p-2 rounded-b">
                <Button type={"submit"}
                    className="inline-block float-right rounded bg-voilet px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                >
                    Next
                </Button>
            </div>
        </form>
    );
}