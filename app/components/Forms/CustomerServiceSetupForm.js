
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
import { fetchBot, setBotId } from "../store/slices/botIdSlice";

export default function CustomerServiceSetupForm({ formCustomerData, setCustomerFormData, intakeStep, setIntakeStep, setShowModal, form = true }) {
  const dispatch = useDispatch()

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
    bot_name: formCustomerData?.bot_name ?? '',
    enable_cancellations: formCustomerData?.enable_cancellations ?? false,
    cancellation_friendliness: formCustomerData?.cancellation_friendliness ?? '1',
    faq_upload: formCustomerData?.faq_upload ?? '',
    email_ticketing_system: formCustomerData?.email_ticketing_system ?? 'Other',
    ecommerce_platform: formCustomerData?.ecommerce_platform ?? 'Other',
    payments_platform: formCustomerData?.payments_platform ?? 'Other',
    refund_tolerance: false,
    payment_platform: formCustomerData?.payment_platform ?? '',
  })

  const onSubmit = async (data) => {
    setLoading(true)
    let payload = {
      "category": "standard",
      "description": "",
      "automation_tolerance": 0,
      "logo": botLogo,
      "chat_title": formValues.bot_name,
      "payment_platform": formValues.payments_platform,
      "ticketing_platform": formValues.email_ticketing_system,
      "cancellation_tolerance": formValues.enable_cancellations ? formValues.cancellation_friendliness : 0,
      "refund_tolerance": formValues.refund_tolerance ? formValues.refund_friendliness : 0,
      "ecommerce_platform": formValues.ecommerce_platform,
    }

    const bot = await createBot(payload);

    if (bot?.status === 201) {
      const bot_faq = await createBotFaqFile(bot.data.id, { file: faqFile });

      if (bot_faq?.status === 201) {
        dispatch(setBotId(bot.data.id));
        setErrorMessage(null);

        if (form === true) {
          setCustomerFormData(data);
          setIntakeStep(2);
        } else {
          setShowModal(false);
          dispatch(fetchBot());
        }
      } else {
        setErrorMessage(bot_faq.message);
      }
    } else {
      setErrorMessage(bot.message);
    }

    setLoading(false);

  };

  // Form Handlers
  const handleInputValues = (e) => {
    setErrorMessage(null)
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }
  const handleCheckbox = (e) => {
    setErrorMessage(null)
    const { name, checked } = e.target;
    setFormValues({ ...formValues, [name]: checked });
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
    if (serviceSetupSteps === 1 && !formValues.bot_name) { setErrorMessage('Title is required'); return }
    if (serviceSetupSteps === 5) {
      onSubmit()
    } else {
      setServiceSetupSteps(serviceSetupSteps + 1)
    }
  }



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

  const handleUploadFaq = async (e) => {
    setErrorMessage('')
    let file = e.target.files[0]
    if (allowedFormatsFaq.includes(file.type)) {
      getBase64(file)
        .then(result => {
          console.log(result)
          setFaqFile(result)

        })
        .catch(err => {
          console.log(err);
        });
      setErrorMessage(null)
    } else {
      setErrorMessage('Invalid file format for FAQ. Please select a doc, dot, odt, docx, dotx, epub, pdf, html or txt file.')
    }
  }

  const handleLogoUpload = async (e) => {
    setErrorMessage('')
    let file = e.target.files[0]
    if (allowFormatsLogo.includes(file.type)) {
      getBase64(file)
        .then(result => {
          console.log(result)
          setBotLogo(result)
        })
        .catch(err => {
          console.log(err);
        });
      setErrorMessage(null)
    } else {
      setErrorMessage('Invalid image format. Please select a JPEG, PNG, or GIF file.')
    }
  }


  // Get title

  const getTitle = () => {
    switch (serviceSetupSteps) {
      case 1:
        return 'Set your customer service preferences to handle refunds, cancellations, and more.'
      case 2:
        return 'Refund Options: Configure Automated Refund Acceptance and Personalize Sensitivity'
      case 3:
        return 'Cancellation Options: Configure Automated Cancellation Acceptance and Personalize Sensitivity'
      case 4:
        return 'Select your payment platform, ecommerce platform, and email ticketing system.'
      case 5:
        return 'Upload your FAQ file to help our bot answer questions about your business and your logo to customize your bot.'
      default:
        return 'Set your customer service preferences to handle refunds, cancellations, and more.'
    }
  }

  return (<>

    <div className='p-3 mx-2 mx-3'>
      <span className="text-sm text-[#808080]">
        {getTitle()}
      </span>
    </div>

    <div className='p-4'>


      {serviceSetupSteps === 1 &&

        <>
          {/* subtitle={'This will show on the top of your bot'} */}
          <TextField onChange={handleInputValues} name='bot_name' value={formValues.bot_name} title={'Chatbot Title'} placeholder={"Tempo AI Chatbot"} type={'text'} id={"bot_name"} className="py-3 mt-1" />
        </>
      }

      {serviceSetupSteps === 2 &&

        <>
          <div className='rounded-full border border-gray p-3 w-2/3'>

            <label className="relative inline-flex items-center cursor-pointer">
              <input onChange={handleCheckbox} name='refund_tolerance' value='' checked={formValues.refund_tolerance} type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray peer-focus:ring-4 peer-focus:ring-blue dark:peer-focus:ring-blue rounded-full peer dark:bg-gray peer-checked:after:translate-x-full peer-checked:after:border-sky after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray after:border border-black border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray peer-checked:bg-sky"></div>
              <span className="ml-3 text-sm font-medium text-gray dark:text-black">Enable Refunds</span>
            </label>
          </div>


          {formValues.refund_tolerance !== false && (
            <div className='m-5 w-2/3'>

              <RadioLabel onClick={handleInputValues} name='refund_friendliness' id={'refund_friendliness'} title={"Refund Friendliness"} className={'mt-3 m-auto'}>
                <RadioField value={'1'} id={'refund_friendliness1'} name={'refund_friendliness'} checked={formValues.refund_friendliness === '1'} />
                <RadioField value={'2'} id={'refund_friendliness2'} name={'refund_friendliness'} checked={formValues.refund_friendliness === '2'} />
                <RadioField value={'3'} id={'refund_friendliness3'} name={'refund_friendliness'} checked={formValues.refund_friendliness === '3'} />
              </RadioLabel>
            </div>

          )}

        </>
      }

      {serviceSetupSteps === 3 &&
        <>
          <div className='rounded-full border border-gray p-3 w-2/3'>

            <label className="relative inline-flex items-center cursor-pointer">
              <input onChange={handleCheckbox} name='enable_cancellations' value='' checked={formValues.enable_cancellations} type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray peer-focus:ring-4 peer-focus:ring-blue dark:peer-focus:ring-blue rounded-full peer dark:bg-gray peer-checked:after:translate-x-full peer-checked:after:border-sky after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray after:border border-black border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray peer-checked:bg-sky"></div>
              <span className="ml-3 text-sm font-medium text-gray dark:text-black">Enable Cancellation</span>
            </label>
          </div>

          {formValues.enable_cancellations !== false && (
            <div className='m-5 w-2/3'>

              <RadioLabel onClick={handleInputValues} name='cancellation_friendliness' id={'cancellation_friendliness'} title={"Refund Friendliness"} className={'mt-3 m-auto'}>
                <RadioField value={'1'} id={'cancellation_friendliness'} name={'cancellation_friendliness'} checked={formValues.cancellation_friendliness === '1'} />
                <RadioField value={'2'} id={'cancellation_friendliness'} name={'cancellation_friendliness'} checked={formValues.cancellation_friendliness === '2'} />
                <RadioField value={'3'} id={'cancellation_friendliness'} name={'cancellation_friendliness'} checked={formValues.cancellation_friendliness === '3'} />
              </RadioLabel>
            </div>
          )}
        </>
      }


      {serviceSetupSteps === 4 &&

        <>

          <SelectField onChange={handleInputValues} value={formValues.ticketing_platform} name='ticketing_platform' values={email_ticketing_system_data} title={"Email Ticketing System"} id={'email_ticketing_system'} className="py-3" />

          <SelectField onChange={handleInputValues} value={formValues.ecommerce_platform} name='ecommerce_platform' values={ecommerce_platform_data} title={"Ecommerce Platform"} id={'ecommerce_platform'} className="py-3" />

          <SelectField onChange={handleInputValues} value={formValues.payments_platform} name='payments_platform' values={payments_platform_data} title={"Payments Platform"} id={'payments_platform'} className="py-3" />

        </>
      }

      {serviceSetupSteps === 5 &&

        <>
          <div className='mx-4'>
            <FileField title={'FAQ Upload'} placeholder={"FAQ Upload"} type={'file'} id={"faq_upload"} onChange={handleUploadFaq} />
            <br />
            <FileField title={'Logo Upload'} placeholder={"Logo Upload"} type={'file'} id={"logo_upload"} onChange={handleLogoUpload} />
          </div>
        </>
      }

      {error && (<div className='mt-2'><small className="text-red text-start" >{error}</small></div>)}

      <div className="flex col-span-3  items-center justify-between p-2 rounded-b mt-5">
        {(
          <Button type={"button"}
            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
            onClick={handleBack}
            disabled={form == false && serviceSetupSteps == 1}
          >
            Back
          </Button>
        )}
        <Button type={"button"}
          className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
          onClick={handleForward}
          disabled={error || loading}
        >
          {serviceSetupSteps === 5 ? (loading ? 'Loading...' : 'Submit') : 'Next'}

        </Button>
      </div>
    </div>
  </>);
}