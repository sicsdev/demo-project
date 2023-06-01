
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Button from "../Common/Button/Button";
import RadioField from "../Common/Input/RadioField";
import RadioLabel from "../Common/Label/RadioLabel";
import FileField from "../Common/Input/FileField";
import SelectField from "../Common/Input/SelectField";
import { ecommerce_platform_data, email_ticketing_system_data, payments_platform_data } from "./data/FormData";
import { useState } from "react";
import TextField from "../Common/Input/TextField";
import { createBot, createBotFaqFile } from "@/app/API/pages/Bot";
import { useDispatch } from "react-redux";
import { setBotId } from "../store/slices/botIdSlice";
const schema = yup.object({
  enable_refund: yup.string().required(),
  refund_friendliness: yup.string(),
  enable_cancellations: yup.string().required(),
  cancellation_friendliness: yup.string(),
  faq_upload: yup.string().required(),
  logo_upload: yup.string(),
  bot_name: yup.string().required(),
  email_ticketing_system: yup.string().required(),
  ecommerce_platform: yup.string().required(),
  payments_platform: yup.string().required(),
}).required();

export default function CustomerServiceSetupForm({ formCustomerData, setCustomerFormData, intakeStep, setIntakeStep }) {
  const dispatch = useDispatch()
  const [showRefund_friendliness, setShowRefund_friendliness] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setErrorMessage] = useState(null)
  const [botLogo, setBotLogo] = useState(formCustomerData?.logo_upload ? formCustomerData.logo_upload : '')
  const [faqFile, setFaqFile] = useState(formCustomerData?.faq_upload ? formCustomerData.faq_upload : '')

  const [howCancelFriendliness, setShowCancelFriendliness] = useState(true)

  const allowedFormatsFaq = ['application/msword', 'application/vnd.oasis.opendocument.text', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.wordprocessingml.template', 'application/epub+zip', 'application/pdf', 'text/html', 'text/plain']
  const allowFormatsLogo = ['image/jpeg', 'image/png', 'image/gif'];
  const { register, handleSubmit, resetField, setValue, setError, getValues, formState: { errors } } = useForm({
    defaultValues: {
      enable_refund: formCustomerData?.enable_refund ? formCustomerData.enable_refund : '',
      refund_friendliness: formCustomerData?.refund_friendliness ? formCustomerData.refund_friendliness : '',
      logo_upload: formCustomerData?.logo_upload ? formCustomerData.logo_upload : '',
      bot_name: formCustomerData?.bot_name ? formCustomerData.bot_name : '',
      enable_cancellations: formCustomerData?.enable_cancellations ? formCustomerData.enable_cancellations : '',
      cancellation_friendliness: formCustomerData?.cancellation_friendliness ? formCustomerData.cancellation_friendliness : '',
      faq_upload: formCustomerData?.faq_upload ? formCustomerData.faq_upload : '',
      email_ticketing_system: formCustomerData?.email_ticketing_system ? formCustomerData.email_ticketing_system : '',
      ecommerce_platform: formCustomerData?.ecommerce_platform ? formCustomerData.ecommerce_platform : '',
      payments_platform: formCustomerData?.payments_platform ? formCustomerData.payments_platform : '',
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    setLoading(true)
    let payload = {
      "category": "standard",
      "description": "",
      "automation_tolerance": 0,
      "logo": botLogo,
      "chat_title": data.bot_name,
      "payment_platform": data.payments_platform,
      "ticketing_platform": data.email_ticketing_system
    }

    if (data.enable_cancellations === "No") {
      payload.refund_tolerance = 0
      payload.cancellation_tolerance = 0
    } else if (data.enable_cancellations === "Yes" && data.cancellation_friendliness === "Low") {
      payload.refund_tolerance = 1
      payload.cancellation_tolerance = 1
    } else if (data.enable_cancellations === "Yes" && data.cancellation_friendliness === "Normal") {
      payload.refund_tolerance = 2
      payload.cancellation_tolerance = 2
    } else if (data.enable_cancellations === "Yes" && data.cancellation_friendliness === "High") {
      payload.refund_tolerance = 3
      payload.cancellation_tolerance = 3
    }
    console.log("payload", payload)
    const bot = await createBot(payload)
    if (bot?.status === 201) {
      const bot_faq = await createBotFaqFile(bot.data.id, { file: faqFile })
      if (bot_faq?.status === 201) {
        dispatch(setBotId(bot.data.id))
        setCustomerFormData(data)
        setLoading(false)
        setErrorMessage(null)
        setIntakeStep(2)
      } else {
        setErrorMessage(bot_faq.message)
        setLoading(false)
      }
    } else {
      setErrorMessage(bot.message)
      setLoading(false)
    }
  };

  const getBase64 = (file) => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("Called", reader);
        baseURL = reader.result;
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };



  return (
    <div>
      <form className='block sm:grid md:block lg:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 p-5 gap-10' onSubmit={handleSubmit(onSubmit)}>

        <TextField subtitle={'This will show on the top of your bot'} title={'Chat Title'} register={register("bot_name")} error={errors.bot_name} placeholder={"Chat Title"} type={'text'} id={"bot_name"} className="py-1" />

        <RadioLabel className={'mt-3'} id={'enable_refund'} title={"Enable Refunds"} error={errors.enable_refund} >
          <RadioField value={'Yes'} id={'enable_refund1'} name={'enable_refund'} error={errors.enable_refund} register={register('enable_refund')} />
          <RadioField value={'No'} id={'enable_refund2'} name={'enable_refund'} error={errors.enable_refund} register={register('enable_refund', {
            onChange: (e) => {
              if (e.target.value === "No") {
                setShowRefund_friendliness(false)
                resetField('refund_friendliness')
                setValue("faq_upload", "dsfsdfsdfs")
              }
              else {
                if (getValues().enable_cancellations === "Yes" || getValues().enable_cancellations === "") {
                  setShowRefund_friendliness(true)
                }
              }
            },
          })} />
        </RadioLabel>

        {showRefund_friendliness && (
          <RadioLabel id={'refund_friendliness'} title={"Refund Friendliness"} error={errors.refund_friendliness} className={'mt-3'}>
            <RadioField value={'Very'} id={'refund_friendliness1'} name={'refund_friendliness'} error={errors.refund_friendliness} register={register('refund_friendliness')} />
            <RadioField value={'Normal'} id={'refund_friendliness2'} name={'refund_friendliness'} error={errors.refund_friendliness} register={register('refund_friendliness')} />
            <RadioField value={'Low'} id={'refund_friendliness3'} name={'refund_friendliness'} error={errors.refund_friendliness} register={register('refund_friendliness',)} />
          </RadioLabel>
        )}
        <RadioLabel id={'enable_cancellations'} title={"Enable Cancellations"} error={errors.enable_cancellations} >
          <RadioField value={'Yes'} id={'enable_cancellations1'} name={'enable_cancellations'} error={errors.enable_cancellations} register={register('enable_cancellations')} />
          <RadioField value={'No'} id={'enable_cancellations2'} name={'enable_cancellations'} error={errors.enable_cancellations} register={register('enable_cancellations', {
            onChange: (e) => {
              if (e.target.value === "No") {
                setShowRefund_friendliness(false)

                setShowCancelFriendliness(false)
                resetField('refund_friendliness')
                resetField('cancellation_friendliness')

              }
              else {
                if (getValues().enable_refund === "Yes" || getValues().enable_refund === "") {
                  setShowRefund_friendliness(true)
                }
                setShowCancelFriendliness(true)

              }
            },
          })} />
        </RadioLabel>

        {howCancelFriendliness && (
          <RadioLabel id={'cancellation_friendliness'} title={"Cancellation Friendliness"} error={errors.cancellation_friendliness} >
            <RadioField value={'High'} id={'cancellation_friendliness1'} name={'cancellation_friendliness'} error={errors.cancellation_friendliness} register={register('cancellation_friendliness')} />
            <RadioField value={'Normal'} id={'cancellation_friendliness2'} name={'cancellation_friendliness'} error={errors.cancellation_friendliness} register={register('cancellation_friendliness')} />
            <RadioField value={'Low'} id={'cancellation_friendliness3'} name={'cancellation_friendliness'} error={errors.cancellation_friendliness} register={register('cancellation_friendliness')} />
          </RadioLabel>
        )}

        <SelectField values={email_ticketing_system_data} register={register("email_ticketing_system")} title={"Email Ticketing System"} id={'email_ticketing_system'} error={errors.email_ticketing_system} />
        <SelectField values={ecommerce_platform_data} register={register("ecommerce_platform")} title={"Ecommerce Platform"} id={'ecommerce_platform'} error={errors.ecommerce_platform} />
        <SelectField values={payments_platform_data} register={register("payments_platform")} title={"Payments Platform"} id={'payments_platform'} error={errors.payments_platform} />
        <FileField title={'FAQ Upload'} register={register('faq_upload', {
          onChange: (e) => {
            let file = e.target.files[0]
            if (allowedFormatsFaq.includes(file.type)) {
              getBase64(file)
                .then(result => {
                  setFaqFile(result)

                })
                .catch(err => {
                  console.log(err);
                });
              setErrorMessage(null)
            } else {
              setError('faq_upload', {type:'custom', message: 'Invalid file format. Please select a doc, dot, odt, docx, dotx, epub, pdf, html or txt file.' })
              setErrorMessage('Invalid file format. Please select a doc, dot, odt, docx, dotx, epub, pdf, html or txt file.')
              resetField('faq_upload')
            }

          },
        })} error={errors.faq_upload} placeholder={"FAQ Upload"} type={'file'} id={"faq_upload"} />
        <FileField title={'Logo Upload'} register={register('logo_upload', {
          onChange: (e) => {
            let file = e.target.files[0]
            if (allowFormatsLogo.includes(file.type)) {
              getBase64(file)
                .then(result => {
                  setBotLogo(result)
                })
                .catch(err => {
                  console.log(err);
                });
              setErrorMessage(null)
            } else {
              setError('faq_upload', {type:'custom', message: 'Invalid file format. Please select a JPEG, PNG, or GIF file.' })
              setErrorMessage('Invalid file format. Please select a JPEG, PNG, or GIF file.')
            }

          },
        })} error={errors.logo_upload} placeholder={"Logo Upload"} type={'file'} id={"logo_upload"} />

        {error && (<span className="text-xs text-danger col-span-3 mt-2 text-center">{error}</span>)}
        <div className="flex col-span-3  items-center justify-between p-2 rounded-b">
          <Button type={"button"}
            className="inline-block rounded bg-voilet px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
            onClick={() => { setIntakeStep(0) }}
          >
            Back
          </Button>
          <Button type={"submit"}
            className="inline-block rounded bg-voilet px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
            disabled={loading ? true : false}
          >
            {loading ? 'Loading...' : 'Next'}
          </Button>
        </div>
      </form>
    </div>
  );
}