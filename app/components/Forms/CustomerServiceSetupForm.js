
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Button from "../Common/Button/Button";
import RadioField from "../Common/Input/RadioField";
import RadioLabel from "../Common/Label/RadioLabel";
import FileField from "../Common/Input/FileField";
import SelectField from "../Common/Input/SelectField";

const schema = yup.object({
  enable_refund: yup.string().required(),
  refund_friendliness: yup.string().required(),
  enable_cancellations: yup.string().required(),
  cancellation_friendliness: yup.string().required(),
  faq_upload: yup.string().required(),
  email_ticketing_system: yup.string().required(),
  ecommerce_platform: yup.string().required(),
  payments_platform: yup.string().required(),
}).required();

export default function CustomerServiceSetupForm({ formData, setFormData, intakeStep, setIntakeStep }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      enable_refund: '',
      refund_friendliness: '',
      enable_cancellations: '',
      cancellation_friendliness: '',
      faq_upload: '',
      email_ticketing_system: '',
      ecommerce_platform: '',
      payments_platform: '',
    },
    resolver: yupResolver(schema)
  });
  console.log(errors)
  const onSubmit = (data) => {
    console.log(data.faq_upload[0].name)
    setFormData(data)
    setIntakeStep(2)
  };
  return (
    <div>
      <form className='block sm:grid md:block lg:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 p-5 gap-10' onSubmit={handleSubmit(onSubmit)}>
        <RadioLabel id={'enable_refund'} title={"Enable Refunds"} error={errors.enable_refund} >
          <RadioField value={'Yes'} id={'enable_refund'} name={'enable_refund'} error={errors.enable_refund} register={register('enable_refund')} />
          <RadioField value={'No'} id={'enable_refund'} name={'enable_refund'} error={errors.enable_refund} register={register('enable_refund')} />
        </RadioLabel>
        <RadioLabel id={'refund_friendliness'} title={"Refund Friendliness"} error={errors.refund_friendliness} >
          <RadioField value={'Very'} id={'refund_friendliness'} name={'refund_friendliness'} error={errors.refund_friendliness} register={register('refund_friendliness')} />
          <RadioField value={'Normal'} id={'refund_friendliness'} name={'refund_friendliness'} error={errors.refund_friendliness} register={register('refund_friendliness')} />
          <RadioField value={'Low'} id={'refund_friendliness'} name={'refund_friendliness'} error={errors.refund_friendliness} register={register('refund_friendliness')} />
        </RadioLabel>
        <RadioLabel id={'enable_cancellations'} title={"Enable Cancellations"} error={errors.enable_cancellations} >
          <RadioField value={'Yes'} id={'enable_cancellations'} name={'enable_cancellations'} error={errors.enable_cancellations} register={register('enable_cancellations')} />
          <RadioField value={'No'} id={'enable_cancellations'} name={'enable_cancellations'} error={errors.enable_cancellations} register={register('enable_cancellations')} />
        </RadioLabel>
        <RadioLabel id={'cancellation_friendliness'} title={"Cancellation Friendliness"} error={errors.cancellation_friendliness} >
          <RadioField value={'High'} id={'cancellation_friendliness'} name={'cancellation_friendliness'} error={errors.cancellation_friendliness} register={register('cancellation_friendliness')} />
          <RadioField value={'Normal'} id={'cancellation_friendliness'} name={'cancellation_friendliness'} error={errors.cancellation_friendliness} register={register('cancellation_friendliness')} />
          <RadioField value={'Low'} id={'cancellation_friendliness'} name={'cancellation_friendliness'} error={errors.cancellation_friendliness} register={register('cancellation_friendliness')} />
        </RadioLabel>
        <SelectField values={['Zendesk', 'Freshdesk', 'Zoho Desk', 'Intercom', 'Gorgias', 'Slack', 'GMail', 'Outlook', 'Other']} register={register("email_ticketing_system")} title={"Email Ticketing System"} id={'email_ticketing_system'} error={errors.email_ticketing_system} />
        <SelectField values={['Shopify', 'WooCommerce', 'Magento', 'Wix', 'Square', 'BigCommerce', 'Other / Custom']} register={register("ecommerce_platform")} title={"Ecommerce Platform"} id={'ecommerce_platform'} error={errors.ecommerce_platform} />
        <SelectField values={['Shopify Pay', 'Stripe', 'Square', 'Amazon Pay', 'BrainTree', 'PayPal', 'NMI', 'Other']} register={register("payments_platform")} title={"Payments Platform"} id={'payments_platform'} error={errors.payments_platform} />
        <FileField title={'FAQ Upload'} register={register('faq_upload')} error={errors.faq_upload} placeholder={"FAQ Upload"} type={'file'} id={"faq_upload"} />
        <div className="flex col-span-3 items-center justify-end p-2 rounded-b">
          <Button type={"submit"}
            className="inline-block float-right rounded bg-voilet px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}