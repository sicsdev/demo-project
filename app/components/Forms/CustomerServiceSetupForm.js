
import Button from "../Common/Button/Button";
import { ecommerce_platform_data, email_ticketing_system_data, payments_platform_data } from "./data/FormData";
import { useState } from "react";
import TextField from "../Common/Input/TextField";
import { createBot, createBotKnowledge } from "@/app/API/pages/Bot";
import { useDispatch } from "react-redux";
import { fetchBot, setBotId } from "../store/slices/botIdSlice";
import LoaderButton from "../Common/Button/Loaderbutton";

export default function CustomerServiceSetupForm({ formCustomerData, setCustomerFormData, intakeStep, setIntakeStep, setShowModal, form = true, setIntakeCompleteStep, intakeCompleteStep }) {
  const dispatch = useDispatch()

  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setErrorMessage] = useState(null)
  const [botLogo, setBotLogo] = useState(formCustomerData?.logo_upload ? formCustomerData.logo_upload : '')
  const [faqFile, setFaqFile] = useState(formCustomerData?.faq_upload ? formCustomerData.faq_upload : '')
  const [serviceSetupSteps, setServiceSetupSteps] = useState(1)

  const allowedFormatsFaq = ['application/msword', 'application/vnd.oasis.opendocument.text', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.wordprocessingml.template', 'application/epub+zip', 'application/pdf', 'text/html', 'text/plain']
  const allowFormatsLogo = ['image/jpeg', 'image/png', 'image/gif'];

  const [formValues, setFormValues] = useState({
    enable_refund: formCustomerData?.enable_refund ?? '',
    refund_friendliness: formCustomerData?.refund_friendliness ?? '1',
    logo_upload: formCustomerData?.logo_upload ?? '',
    faq_upload: formCustomerData?.faq_upload ?? '',
    bot_name: formCustomerData?.bot_name ?? '',
    enable_cancellations: formCustomerData?.enable_cancellations ?? false,
    cancellation_friendliness: formCustomerData?.cancellation_friendliness ?? '1',
    email_ticketing_system: formCustomerData?.email_ticketing_system ?? 'Other',
    ecommerce_platform: formCustomerData?.ecommerce_platform ?? 'Other',
    payments_platform: formCustomerData?.payments_platform ?? 'Other',
    refund_tolerance: false,
    payment_platform: formCustomerData?.payment_platform ?? '',
    faq_url: formCustomerData?.faq_url ?? '',
    help_center_url: formCustomerData?.help_center_url ?? '',
    refund_return_url: formCustomerData?.refund_return_url ?? '',
    membership_policy_url: formCustomerData?.membership_policy_url ?? '',
    shipping_policy_url: formCustomerData?.shipping_policy_url ?? '',
    other_url: formCustomerData?.other_url ?? '',
  })

  const checkValue = () => {
    if (formValues.faq_url !== "") {
      return true
    }
    if (formValues.help_center_url !== "") {
      return true
    }
    if (formValues.refund_return_url !== "") {
      return true
    }
    if (formValues.membership_policy_url !== "") {
      return true
    }
    if (formValues.shipping_policy_url !== "") {
      return true
    }
    if (formValues.other_url !== "") {
      return true
    }
    return false
  }
  console.log(formValues)
  const onSubmit = async (data) => {
    setLoading(true)

    if (form === true) {
      if (intakeCompleteStep === intakeStep) {
        let payload = {
          "category": "standard",
          "description": "",
          "automation_tolerance": 0,
          "logo": botLogo,
          "chat_title": 'Tempo Agent',
          "payment_platform": formValues.payments_platform,
          "ticketing_platform": formValues.email_ticketing_system,
          "cancellation_tolerance": formValues.enable_cancellations ? formValues.cancellation_friendliness : 0,
          "refund_tolerance": formValues.refund_tolerance ? formValues.refund_friendliness : 0,
          "ecommerce_platform": formValues.ecommerce_platform,
        }

        const bot = await createBot(payload);
        if (bot?.status === 201) {
          const bot_faq = await createBotKnowledge(bot.data.id, returnFilesUrl());
          if (bot_faq?.status === 201) {
            dispatch(setBotId(bot.data.id));
            setErrorMessage(null);
            setCustomerFormData(formValues);
            setIntakeStep(2);
            setIntakeCompleteStep(2)
          } else {
            setErrorMessage(bot_faq.message);
          }
        } else {
          setErrorMessage(bot.message);
        }
        setLoading(false);
      } else {
        setIntakeStep(2)
      }
    } else {
      let payload = {
        "category": "standard",
        "description": "",
        "automation_tolerance": 0,
        "logo": botLogo,
        "chat_title": 'Tempo Agent',
        "payment_platform": formValues.payments_platform,
        "ticketing_platform": formValues.email_ticketing_system,
        "cancellation_tolerance": formValues.enable_cancellations ? formValues.cancellation_friendliness : 0,
        "refund_tolerance": formValues.refund_tolerance ? formValues.refund_friendliness : 0,
        "ecommerce_platform": formValues.ecommerce_platform,
      }

      const bot = await createBot(payload);
      if (bot?.status === 201) {
        const bot_faq = await createBotKnowledge(bot.data.id, returnFilesUrl());
        if (bot_faq?.status === 201) {
          dispatch(setBotId(bot.data.id));
          setErrorMessage(null);
          setShowModal(false);
          dispatch(fetchBot());

        } else {
          setErrorMessage(bot_faq.message);
        }
      } else {
        setErrorMessage(bot.message);
      }
      setLoading(false);
    }



  };

  const returnFilesUrl = () => {
    let all_url = [formValues.faq_url, formValues.membership_policy_url, formValues.help_center_url, formValues.refund_return_url, formValues.shipping_policy_url, formValues.other_url]
    const filter_urls = all_url.filter((x) => x !== "")
    return { urls: filter_urls }
  }

  // Form Handlers
  const handleInputValues = (e) => {
    setErrors([])
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }



  // Service Setup Steps handlers
  const handleBack = () => {
    if (serviceSetupSteps === 1) {
      setIntakeStep(0)
    } else {
      setServiceSetupSteps(serviceSetupSteps - 1)
    }
  }

  const handleForward = () => {
    onSubmit()

  }
  const validateForm = (formNumber) => {
    const formFields = {
      1: {
        bot_name: "Chat Title"
      },
    };

    const requiredFields = formFields[formNumber];
    const errors = Object.entries(requiredFields)
      .filter(([field, label]) => formValues[field] === '')
      .map(([field, label]) => { return { field, message: `${label} is required` } });

    setErrors(errors);
    return errors.length === 0;
  };



  console.log("wrref", error)
  // FAQ && File Uploads handlers 
  const getBase64 = (file) => {
    return new Promise(resolve => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("Called", reader);
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  // Get title
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
    <div className="w-full">


      {serviceSetupSteps === 1 &&

        <div className="">
          {/* <TextField onChange={handleInputValues} name='bot_name' error={returnErrorMessage("bot_name")} value={formValues.bot_name} title={'Chat Title'} placeholder={"Tempo AI Chatbot"} type={'text'} id={"bot_name"} className="py-3 mt-1" /> */}
          {/* <FileField title={'Logo Upload'} error={returnErrorMessage("logo_upload")} placeholder={"Logo Upload"} type={'file'} id={"logo_upload"} onChange={handleLogoUpload} /> */}
          <div className="grid grid-cols-1  my-4 gap-4">
            {/* <div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input onChange={handleCheckbox} name='refund_tolerance' value='' checked={formValues.refund_tolerance} type="checkbox" className="" />
                <span className="ml-3 text-sm font-medium text-heading ">Enable Refunds</span>
              </label>


              {formValues.refund_tolerance !== false && (
                <div className='m-5 '>

                  <RadioLabel onClick={handleInputValues} name='refund_friendliness' id={'refund_friendliness'} title={"Refund Friendliness"} className={'mt-3 m-auto'}>
                    <RadioField value={'1'} id={'refund_friendliness1'} name={'refund_friendliness'} checked={formValues.refund_friendliness === '1'} />
                    <RadioField value={'2'} id={'refund_friendliness2'} name={'refund_friendliness'} checked={formValues.refund_friendliness === '2'} />
                    <RadioField value={'3'} id={'refund_friendliness3'} name={'refund_friendliness'} checked={formValues.refund_friendliness === '3'} />
                  </RadioLabel>
                </div>

              )}
            </div>
            <div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input onChange={handleCheckbox} name='enable_cancellations' value='' checked={formValues.enable_cancellations} type="checkbox" className="" />
                <span className="ml-3 text-sm font-medium ">Enable Cancellation</span>
              </label>

              {formValues.enable_cancellations !== false && (
                <div className='m-5 '>

                  <RadioLabel onClick={handleInputValues} name='cancellation_friendliness' id={'cancellation_friendliness'} title={"Refund Friendliness"} className={'mt-3 m-auto'}>
                    <RadioField value={'1'} id={'cancellation_friendliness'} name={'cancellation_friendliness'} checked={formValues.cancellation_friendliness === '1'} />
                    <RadioField value={'2'} id={'cancellation_friendliness'} name={'cancellation_friendliness'} checked={formValues.cancellation_friendliness === '2'} />
                    <RadioField value={'3'} id={'cancellation_friendliness'} name={'cancellation_friendliness'} checked={formValues.cancellation_friendliness === '3'} />
                  </RadioLabel>
                </div>
              )}
            </div> */}
            {/* <SelectField onChange={handleInputValues} value={formValues.ticketing_platform} error={returnErrorMessage("ticketing_platform")} name='ticketing_platform' values={email_ticketing_system_data} title={"Email Ticketing System"} id={'email_ticketing_system'} className="py-3" /> */}
            {/* <SelectField onChange={handleInputValues} value={formValues.ecommerce_platform} error={returnErrorMessage("ecommerce_platform")} name='ecommerce_platform' values={ecommerce_platform_data} title={"Ecommerce Platform"} id={'ecommerce_platform'} className="py-3" /> */}
            {/* <SelectField onChange={handleInputValues} value={formValues.payments_platform} error={returnErrorMessage("payments_platform")} name='payments_platform' values={payments_platform_data} title={"Payments Platform"} id={'payments_platform'} className="py-3" /> */}
            <TextField onChange={handleInputValues} name='faq_url' value={formValues.faq_url} error={returnErrorMessage("faq_url")} title={'Add your Help Center or FAQ URL'} placeholder={"Help Center or FAQ URL"} type={'text'} id={"faq_url"} className="py-3 mt-1" />
            {formValues.faq_url && (
              <TextField onChange={handleInputValues} name='help_center_url' error={returnErrorMessage("help_center_url")} value={formValues.help_center_url} title={'Optional Additional URL'} placeholder={"Optional Additional URL"} type={'text'} id={"help_center_url"} className="py-3 mt-1" />
            )}
            {formValues.help_center_url && (
              <TextField onChange={handleInputValues} name='refund_return_url' error={returnErrorMessage("refund_return_url")} value={formValues.refund_return_url} title={'Optional Additional URL'} placeholder={"Optional Additional URL"} type={'text'} id={"refund_return_url"} className="py-3 mt-1" />)}
            {formValues.refund_return_url && (
              <TextField onChange={handleInputValues} name='membership_policy_url' error={returnErrorMessage("membership_policy_url")} value={formValues.membership_policy_url} title={'Optional Additional URL'} placeholder={"Optional Additional URL"} type={'text'} id={"membership_policy_url"} className="py-3 mt-1" />
            )}
            {formValues.membership_policy_url && (

              <TextField onChange={handleInputValues} name='shipping_policy_url' error={returnErrorMessage("shipping_policy_url")} value={formValues.shipping_policy_url} title={'Optional Additional URL'} placeholder={"Optional Additional URL"} type={'text'} id={"shipping_policy_url"} className="py-3 mt-1" />
            )}
            {formValues.shipping_policy_url && (

              <TextField onChange={handleInputValues} name='other_url' value={formValues.other_url} error={returnErrorMessage("other_url")} title={'Optional Additional URL'} placeholder={"Optional Additional URL"} type={'text'} id={"other_url"} className="py-3 mt-1" />
            )}
          </div>
        </div>
      }



      {error && (<small className="text-danger text-center mx-auto">{error}</small>)}




      <div className="flex col-span-3  items-center justify-between p-2 rounded-b mt-5">
        {form == true && (
          <Button type={"button"}
            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
            onClick={handleBack}
            disabled={form == false}
          >
            Back
          </Button>
        )}
        {loading ?
          <LoaderButton />
          :
          <Button type={"button"}
            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
            onClick={handleForward}
            disabled={loading ||
              checkValue() == false
            }
          >
            {loading ? 'Loading...' : form ? "Next" : 'Submit'}

          </Button>}


      </div>
    </div>);
}