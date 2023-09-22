"use client";
import React, { useEffect, useState } from "react";
import BasicDetails from "../Forms/BasicDetails";
import Embed from "../Embed/Embed";
import CustomerServiceSetupForm from "../Forms/CustomerServiceSetupForm";
import { useDispatch, useSelector } from "react-redux";
import {
  UserCircleIcon,
  CogIcon,
  InboxArrowDownIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import Customize from "../Customize/Customize";
import EmailConfig from "../EmailConfig/EmailConfig";
import EmailAgentSetting from "../EmailAgentSetting/EmailAgentSetting";
import Button from "../Common/Button/Button";
import LoaderButton from "../Common/Button/Loaderbutton";
import {
  addNewDomain,
  createEnterpriseAccount,
  enterpriseDomainInitialize,
  enterpriseDomainVerify,
  uploadImage,
} from "@/app/API/pages/EnterpriseService";
import { state_data } from "../Forms/data/FormData";
import { createBot, createBotKnowledge, modifyBot } from "@/app/API/pages/Bot";
import { fetchBot, setBotId, setModalValue } from "../store/slices/botIdSlice";
import IntegrationIntake from "../Integration/IntegrationIntake";
import { addIntegrationData } from "@/app/API/pages/Integration";
import { buyAvailableMobileNumbers } from "@/app/API/components/PhoneNumber";
import { errorMessage } from "../Messages/Messages";
import { ToastContainer } from "react-toastify";
import { createNewKnowledge } from "@/app/API/pages/Knowledge";

const Intake = () => {
  const headingData = [
    {
      step: 0,
      text: "Business Information",
      logo: <UserCircleIcon className="w-10 h-10 mr-2" />,
    },
    {
      step: 1,
      text: "Help Center URL",
      logo: <CogIcon className="w-10 h-10 mr-2" />,
    },
    {
      step: 2,
      text: "Phone & Email Setup",
      logo: <InboxArrowDownIcon className="w-10 h-10 mr-2" />,
    },
    {
      step: 3,
      text: "Customize Bot",
      logo: <InboxArrowDownIcon className="w-10 h-10 mr-2" />,
    },
  ]
  const [basicFormData, setBasicFormData] = useState({});
  let state = useSelector((state) => state.botId.showModal);
  let user = useSelector((state) => state.user.data);
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [intakeStep, setIntakeStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [intakeCompleteStep, setIntakeCompleteStep] = useState(0);
  const [headings, setHeadings] = useState(headingData
  )
  const dispatch = useDispatch();
  useEffect(() => {
    setShowModal(state);
  }, [state]);
  console.log(basicFormData)
  function displayErrorMessages(errors) {
    let firstError = '';

    for (const key in errors) {
      if (errors.hasOwnProperty(key) && errors[key].length > 0) {
        firstError = errors[key][0];
        break; // Exit loop after finding the first error
      }
    }

    return firstError;
  }
  useEffect(() => {
    if (!basicFormData?.business_industry) {
      if (user?.enterprise) {
        setBasicFormData((prev) => {
          return {
            ...prev,
            business_industry: user?.enterprise?.industry,
            business_name: user?.enterprise?.name,
            business_company_size: user?.enterprise?.company_size
          }
        })
      }
    }
    if (!basicFormData?.recommended_integrations) {
      setBasicFormData((prev) => {
        return {
          ...prev,
          // recommended_integrations: user?.enterprise?.recommended_integrations,
          recommended_integrations: ["slack", "stripe", "sentry"],
        }
      })
      if (user?.enterprise?.recommended_integrations.length > 0) {
        setHeadings([...headingData, {
          step: 4,
          text: "Add Integrations",
          logo: <InboxArrowDownIcon className="w-10 h-10 mr-2" />,
        }])
      }
    }
  }, [user])
  console.log(basicFormData)
  const GetStepForm = () => {
    switch (intakeStep) {
      case 0:
        return {
          title: <>Business Information</>,
          form: (
            <BasicDetails
              basicFormData={basicFormData}
              setBasicFormData={setBasicFormData}
            />
          ),
          btn: "Next",
        };
      case 1:
        return {
          title: <>Help Center URL</>,
          form: (
            <CustomerServiceSetupForm
              basicFormData={basicFormData}
              setBasicFormData={setBasicFormData}
            />
          ),
          btn: "Next",
        };
      case 2:
        return {
          title: (
            <div className="">
              <span className="">Configure Email</span>
              <p className="p-0 m-0">
                <span className="text-border">
                  {basicFormData?.email_prefix ?? "{email_Prefix}"}@
                  {basicFormData?.company_name ?? "{company_name}"}.gettempo.ai
                </span>
              </p>
            </div>
          ),
          form: (
            <EmailAgentSetting
              form={true}
              basicFormData={basicFormData}
              setBasicFormData={setBasicFormData}
            />
          ),
          btn: "Next",
        };
      case 3:
        return {
          title: "Customize Bot",
          form: (
            <Customize
              setBasicFormData={setBasicFormData}
              basicFormData={basicFormData}
              form={true}
            />
          ),
          btn: basicFormData?.recommended_integrations.length > 0 ? "Next" : "Finish",
        };
      case 4:
        return {
          title: "Add Integration",
          form: (
            <IntegrationIntake setIntakeStep={setIntakeStep} basicFormData={basicFormData} setBasicFormData={setBasicFormData} type={''} form={true} />

          ),
          btn: "Finish",
        };
      default:
        return { title: "Form not found !", form: <h1>Something wrong !</h1> };
    }
  };
  const getAbbrevationOfState = (abber) => {
    const findAbber = state_data.find((state) => state.name === abber);
    if (findAbber) {
      return findAbber.abbreviation;
    }
    return "";
  };
  const DisablingButton = () => {
    if (intakeStep === 0) {
      const requiredKeys = [
        "business_street",
        "business_city",
        "business_zipcode",
        "business_state",
        "business_industry",
        "business_name",
        "business_company_size",
        "customer_service_email",
        "customer_service_phone",
      ];
      return requiredKeys.some(
        (key) => !basicFormData[key] || basicFormData[key].trim() === ""
      );
    }
    if (intakeStep === 1) {
      const requiredKeys = ["urls"];
      return requiredKeys.every(
        (key) => !basicFormData[key] || basicFormData[key].length === 0
      );
    }
    // if (intakeStep === 3) {
    //   const requiredKeys = [
    //     "agent_title",
    //     "email_introduction",
    //     "email_signOff",
    //   ];
    //   const str_values = requiredKeys.some(
    //     (key) => !basicFormData[key] || basicFormData[key].trim() === ""
    //   );
    //   const arr_values = ["agent_name"].every(
    //     (key) => !basicFormData[key] || basicFormData[key].length === 0
    //   );
    //   if (str_values || arr_values) {
    //     return true;
    //   }
    // }
    if (intakeStep === 2) {
      const requiredKeys = ["email_prefix", "custom_email", "company_name"];
      return requiredKeys.some(
        (key) => !basicFormData[key] || basicFormData[key].trim() === ""
      );
    }
    if (intakeStep === 4) {
      let requiredKeys = ["billing_platform"];
      if (basicFormData?.billing_platform === 'Other') {
        requiredKeys = ["billing_platform", "billing_api_documentation"];
      }
      return requiredKeys.some(
        (key) => !basicFormData[key] || basicFormData[key].trim() === ""
      );
    }
    return false;
  };

  const SubmitBusinessDetails = async () => {
    setLoading(true);
    let payload = {
      name: basicFormData.business_name,
      country: "US",
      address:
        basicFormData.business_street +
        ", " +
        basicFormData.business_city +
        ", " +
        getAbbrevationOfState(basicFormData.business_state) +
        ", USA" +
        ", " +
        basicFormData.business_zipcode,
      industry: basicFormData.business_industry,
      company_size: basicFormData.business_company_size,
      ecommerce_platform: basicFormData.ecommerce_platform,
      email: basicFormData.customer_service_email,
      phone: basicFormData.customer_service_phone,
    };
    const createEnterprise = await createEnterpriseAccount(payload);
    if (createEnterprise?.status === 200) {
      if (basicFormData.recommended_integrations.length === 0 || basicFormData?.prev_customer_service_email !== basicFormData.customer_service_email.split("@")[1]) {
        const domain = await addNewDomain({ domain: basicFormData.customer_service_email.split("@")[1] })
        if (domain.status === 200) {
          setBasicFormData((prev) => {
            return {
              ...prev,
              recommended_integrations: domain.data,
              prev_customer_service_email: basicFormData.customer_service_email.split("@")[1]
            }
          })
          if (domain.data.length > 0) {
            setHeadings([...headingData, {
              step: 4,
              text: "Add Integrations",
              logo: <InboxArrowDownIcon className="w-10 h-10 mr-2" />,
            }])

          }
        }
      }
      setIntakeStep(1);
      setIntakeCompleteStep(1);
      setErrors([]);
      setLoading(false);
    } else {
      // setErrors([createEnterprise.message]);
      errorMessage(displayErrorMessages(createEnterprise.response.data))
      setLoading(false);
    }
  };

  const CreateBotForm = async () => {
    setLoading(true);
    if (intakeCompleteStep === intakeStep) {
      let payload = {
        category: "standard",
        description: "",
        automation_tolerance: 0,
        logo: "",
        chat_title: basicFormData.business_name ?? "Tempo Agent",
        payment_platform: "Order",
        ticketing_platform: "Other",
        cancellation_tolerance: 0,
        refund_tolerance: 0,
        ecommerce_platform: "Other",
      };
      const bot = await createBot(payload);
      if (bot?.status === 201) {
        const bot_faq = await createNewKnowledge(
          {
            source: "external",
            urls: basicFormData.urls,
          });
        if (bot_faq?.status === 201) {
          dispatch(setBotId(bot.data.id));
          setBasicFormData((prev) => {
            return {
              ...prev,
              bot: "success",
              id: bot.data.id
            };
          });
          setIntakeStep(2);
          setIntakeCompleteStep(2);
        } else {
          setErrors([bot_faq.message]);
        }
      } else {
        setErrors([bot.message]);
      }
      setLoading(false);
    } else {
      setIntakeStep(2);
    }
  };

  const savePreferences = async () => {
    setLoading(true);
    let payload = {
      id: basicFormData.id,
      enterprise: basicFormData.enterprise,
      category: basicFormData.category,
      description: basicFormData.description,
      refund_tolerance: basicFormData.refund_tolerance,
      automation_tolerance: basicFormData.automation_tolerance,
      primary_color: basicFormData.primary_color,
      secondary_color: basicFormData.secondary_color,
      logo: basicFormData.logo_file_name ? basicFormData.logo : "",
      thumbnail: basicFormData.thumbnail,
      chat_title: basicFormData?.business_name ?? "Tempo AI Chatbot",
      chat_message_business_hours: basicFormData?.chat_message_business_hours,
      chat_message_after_hours: basicFormData?.chat_message_after_hours,
      widget_location: basicFormData?.widget_location,
      widget_offset_horizontal: basicFormData?.widget_offset_horizontal,
      widget_offset_vertical: basicFormData?.widget_offset_vertical,
      language: basicFormData?.language,
      cancellation_tolerance: basicFormData?.cancellation_tolerance,
      payment_platform: basicFormData?.payment_platform,
      ticketing_platform: basicFormData?.ticketing_platform,
      logo_file_name: basicFormData?.logo_file_name,
      active: basicFormData?.active,
      email: basicFormData.email_prefix + "@" + basicFormData.company_name + '.gettempo.ai',
      agent_name: basicFormData.agent_name,
      email_agent_title: basicFormData.agent_title,
      email_greeting: basicFormData.email_introduction,
      email_farewell: basicFormData.email_signOff,
      // phone_number: basicFormData?.phone

    };
    !payload.logo && delete payload.logo;
    // const response = await buyAvailableMobileNumbers({ name: basicFormData.company_name, data: basicFormData?.phone, greeting: `Hello, thank you for calling ${basicFormData.company_name}` })
    modifyBot(payload.id, payload)
      .then(async (res) => {


        setLoading(false);

        if (basicFormData?.recommended_integrations.length > 0) {
          setIntakeStep(4);
          setIntakeCompleteStep(4);
        } else {
          dispatch(setModalValue(false));
          dispatch(fetchBot());

        }
        // setIntakeStep(4);
        // setIntakeCompleteStep(4);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const SubmitConfigureEmail = async () => {
    setLoading(true);
    const response = await createEnterpriseAccount({
      slug_domain: basicFormData.company_name,
    });
    if (response.status === 200) {
      const domains = await enterpriseDomainInitialize({
        slug_domain: basicFormData.company_name,
      });
      const verify = await modifyBot(basicFormData.id, {
        email:
          basicFormData.email_prefix +
          "@" +
          basicFormData.company_name +
          ".gettempo.ai",
      });
      const updload_imge = await uploadImage({ file: basicFormData.selectedFile }, basicFormData.id)
      if (domains.status === 200 && verify.status === 200) {
        setBasicFormData((prev) => {
          return {
            ...prev,
            configure: "success",
          };
        });
        setIntakeStep(3);
        setIntakeCompleteStep(3);
        setLoading(false);
      } else {
        setErrors([domains.response.data.slug_domain]);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };
  function validateURL(url) {
    var urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(:\d+)?(\/\S*)?$/;
    return urlPattern.test(url);
  }
  const handleIntegrationSubmitForm = async () => {


    try {
      let data = {};
      setLoading(true);
      switch (basicFormData?.authType) {
        case "none":
          data = {}
          break;
        case "auth":
          data = {
            username: basicFormData?.username,
            password: basicFormData?.password
          }
          break;
        case "api_key":
          data = {
            apikey: basicFormData?.apiKey,
          }
          break;
        case "oauth1":
          data = {
            client_key: basicFormData?.clientkey,
            client_secret: basicFormData?.clientsecret,
          }
          break;
        case "oauth2":
          data = {
            client_key: basicFormData?.clientkey2,
            client_secret: basicFormData?.clientsecret2,
            client_redirect_url: basicFormData?.clientredirecturl,
          }
          break;
        default:
          break;
      }

      let payload = {
        type: "BILLING",
        name: basicFormData.name,
        provider: basicFormData?.provider,
        http_auth_scheme: basicFormData?.authType,
        http_base: basicFormData?.baseUrl,
        data: data
      }

      const configureIntegration = await addIntegrationData(payload);
      const message = `Integration Added Successfully!`;
      setLoading(false);
      dispatch(setModalValue(false));
      dispatch(fetchBot());
      if (configureIntegration?.status === 201 || configureIntegration?.status === 200) {
        setLoading(false);
        dispatch(setModalValue(false));
        dispatch(fetchBot());
      } else {
        console.log('configureIntegration', configureIntegration)
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }

  };
  const SubmitForm = () => {
    setErrors([]);
    switch (intakeStep) {
      case 0:
        SubmitBusinessDetails();
        localStorage.removeItem("hubId");
        break;
      case 1:
        if (basicFormData?.bot === "success") {
          setIntakeStep(2);
          setIntakeCompleteStep(2);
        } else {
          CreateBotForm();
        }
        break;
      case 2:
        if (basicFormData?.configure === "success") {
          setIntakeStep(3);
          setIntakeCompleteStep(3);
        } else {
          SubmitConfigureEmail();
        }

        break;
      case 3:
        savePreferences();
        break;
      case 4:
        // handleIntegrationSubmitForm()
        break;

      default:
        break;
    }
  };


  const sendActiveValue = (element) => {
    if (intakeStep === element.step) {
      return "text-heading";
    }
    if (intakeCompleteStep > element.step) {
      return "text-primary";
    }
    return "text-border";
  };
  const changeStep = (element) => {
    if (
      intakeCompleteStep > element.step ||
      (intakeCompleteStep !== 0 && element.step === intakeCompleteStep)
    ) {
      setIntakeStep(element.step);
    }
  };
  const sendActiveValueLabel = (element) => {
    if (intakeStep === element.step) {
      return "text-white bg-heading";
    }
    if (intakeCompleteStep > element.step) {
      return "text-white bg-primary";
    }
    return "text-white bg-border ";
  };

  const sendTextAndNumber = (element, key) => {
    if (intakeStep == element.step) {
      return key + 1;
    }
    if (intakeCompleteStep > element.step) {
      return (
        <CheckCircleIcon className="bg-white text-primary rounded-full w-full h-auto " />
      );
    }
    return key + 1;
  };
  const handleBack = () => {
    setIntakeStep(intakeStep - 1);
  };
  return (
    <>
      {showModal && (
        <div className={"  py-12 z-[100] bg-white w-full "}>
          <h3 className="justify-center sm:justify-start md:justify-start lg:justify-start flex px-4 font-semibold text-heading items-center gap-4">
            {GetStepForm().title}{" "}
            {basicFormData?.business_name &&
              basicFormData?.business_name !== "" && (
                <span className="text-[10px] font-semibold inline-block py-1 px-2 rounded-md text-primary bg-badge_blue last:mr-0 mr-1">
                  Processing
                </span>
              )}
          </h3>
          <hr className="my-5 mb-0 border-border" />
          <div className="flex items-start  h-auto w-full justify-between  md:justify-start lg:justify-start sm:justify-start gap-16">
            <div className="flex px-0  items-start  bg-white w-full sm:h-auto md:h-auto lg:h-auto sm:w-auto md:w-auto lg:w-auto pt-[25px]">
              <div className="w-[50px] sm:w-[250px] md:w-[250px] lg:w-[250px] h-full bg-white  pl-6">
                <ol className="">
                  {headings.map((element, key) => (
                    <li
                      key={key}
                      className={`cursor-pointer flex gap-2 items-center ${sendActiveValue(
                        element
                      )}`}
                      onClick={(e) => {
                        changeStep(element);
                      }}
                    >
                      <span
                        className={`${key === 0 && "rounded-t-3xl"} ${headings.length - 1 === key && "rounded-b-3xl"
                          } bg-[#ebeef1] h-[40px] flex items-center justify-center w-6 -left-4`}
                      >
                        <h1
                          className={`flex w-[20px] h-[20px]  text-[10px]  font-normal items-center justify-center shadow-md rounded-full ${sendActiveValueLabel(
                            element
                          )}`}
                        >
                          {sendTextAndNumber(element, key)}{" "}
                        </h1>
                      </span>
                      <h3 className=" items-center font-bold h-[30px] m-0 text-xs leading-tight hidden sm:flex md:flex lg:flex">
                        {element.text}
                      </h3>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="w-full bg-white sm:w-[800px] md:w-[800px] lg:w-[800px]  justify-center pb-[40px]  px-6 sm:pr-6 md:pr-6 lg:pr-6 ">
                {GetStepForm().form}

                {basicFormData && basicFormData?.recommended_integrations?.length > 0 && intakeStep === 4 ? "" :
                  <div
                    className={`flex  p-2 rounded-b mt-5 ${intakeStep > 0 ? "justify-between" : "justify-end"
                      }`}
                  >

                    {intakeStep > 0 && (
                      <Button
                        onClick={handleBack}
                        className="inline-block float-left rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                        disabled={loading ? true : false}
                      >
                        Back
                      </Button>
                    )}
                    {loading ? (
                      <LoaderButton />
                    ) : (
                      <>
                        <Button
                          type={"button"}
                          className="inline-block rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                          disabled={DisablingButton()}
                          onClick={(e) => SubmitForm()}
                        >
                          {GetStepForm().btn}
                        </Button>
                      </>
                    )}


                  </div>

                }
                {errors.length > 0 &&
                  errors.map((ele, key) => (
                    <p className="text-danger text-xs" key={key}>
                      {ele}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Intake;
