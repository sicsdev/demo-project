import React from 'react'
import { useState } from 'react'
import TextField from '../Common/Input/TextField'
import { useDispatch } from 'react-redux'
import { email_introduction_data, email_sign_off_data } from './data'
import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import SelectField from '../Common/Input/SelectField'
import Card from '../Common/Card/Card'
import { useEffect } from 'react'
const EmailConfig = ({ basicFormData, setBasicFormData }) => {
    const [errors, setErrors] = useState([])
    const [tileAgentName, setTileAgentName] = useState([])
    const [formValues, setFormValues] = useState({
        email_introduction: basicFormData?.email_introduction ?? '',
        email_signOff: basicFormData?.email_signOff ?? '',
        agent_title:'' ,
        agent_name: basicFormData?.agent_name ?? '',
    })
    useEffect(() => {
        if (basicFormData) {
          setFormValues({
            email_introduction: basicFormData?.email_introduction || '',
            email_signOff: basicFormData?.email_signOff || '',
            agent_title:basicFormData?.agent_title || '',
            agent_name: '',
          });
          setTileAgentName(basicFormData?.agent_name ?? [])
        }
      }, [basicFormData]);  
    const handleInputValues = (e) => {
        const { value } = e.target
        setErrors([])

        setFormValues({ ...formValues, [e.target.name]: makeCapital(value) })
        setBasicFormData(prev => {
            return {
                ...prev,
                [e.target.name]: makeCapital(value)
            }
        })

    }
    const handleAgentNameValue = (e) => {
        const { value } = e.target;

        if (value.includes(',')) {
            const agentNames = value.split(',');
            setFormValues((prev) => {
                return {
                    ...prev,
                    agent_name: '',
                };
            });
            agentNames.forEach((name) => {
                const trimmedName = name.trim();
                if (trimmedName && !tileAgentName.includes(trimmedName)) {
                    setTileAgentName((prev) => { 
                        setBasicFormData((prev_state) => {
                            return {
                              ...prev_state,
                              agent_name: [...prev, trimmedName]
                            }
                          })
                        return [...prev, makeCapital(trimmedName)] 
                    });
                }
            });
        } else {
            setFormValues({ ...formValues, agent_name: value });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const { value } = e.target;
            const agentNames = value.split(',');
            setFormValues((prev) => {
                return {
                    ...prev,
                    agent_name: '',
                };
            });
            agentNames.forEach((name) => {
                const trimmedName = name.trim();
                if (trimmedName && !tileAgentName.includes(trimmedName)) {
                    setTileAgentName((prev) => { 
                        setBasicFormData((prev_state) => {
                            return {
                              ...prev_state,
                              agent_name: [...prev, trimmedName]
                            }
                          })
                        return [...prev, makeCapital(trimmedName)] 
                    });
                }
            });
        }
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
    const RemoveFromAgentNameArr = (element) => {
        const updatedChips = tileAgentName.filter((x) => x !== element);
        setTileAgentName(updatedChips);
        
        setBasicFormData((prev_state) => {
            return {
              ...prev_state,
              agent_name: [...updatedChips]
            }
          })
    }
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
    return (
        <div className='container'>
            <div className='grid grid-cols-1'>
                <div className='my-2'>
                    <SelectField onChange={handleInputValues} value={formValues.email_introduction} error={returnErrorMessage("email_introduction")} name='email_introduction' values={email_introduction_data} title={"Email Introduction"} id={'email_introduction'} className="py-3" /> </div>
                <div className='my-2'>
                    <SelectField onChange={handleInputValues} value={formValues.email_signOff} error={returnErrorMessage("email_signOff")} name='email_introduction' values={email_sign_off_data} title={"Email Sign-Off"} id={'email_signOff'} className="py-3" /> </div>
                <div className='my-2'>
                    <TextField onChange={handleInputValues} value={formValues.agent_title} name='agent_title' className='py-3 mt-1' title={<span className='flex items-center gap-2'>Agent Job Title
                        <div className='group w-[2px] relative'><InformationCircleIcon className=" h-4 w-4 cursor-pointer " /><Card className='animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block'> <span className='text-xs font-light'>An example job description is "Customer Service Representative"</span></Card></div>
                    </span>} placeholder={"Agent Job Title"} type={'text'} id={"agent_title"} error={returnErrorMessage("agent_title")} />
                </div>
                <div className='my-2'>
                    <div className={`inline`}>
                        <label htmlFor={"agent_name"} className="block text-sm font-medium text-heading"><span className='flex items-center gap-2'>Agent Name(s)
                            <div className='group w-[2px] relative'><InformationCircleIcon className=" h-4 w-4 cursor-pointer " /><Card className='animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block'> <span className='text-xs font-light'>Please add the names you'd like your AI agents to sign off with. The algorithm will randomly choose one of the names you enter. Please enter the names EXACTLY as you'd like them separate by commas. Names can include hyphens, periods, or spaces. For example, valid names include Jack, Jack Davidson, Jack D., Jack D, and Jack Davidson-Specter.</span></Card></div>
                        </span></label>
                        <div className='flex flex-wrap justify-start items-center border h-auto w-auto border-border p-1 rounded-md mt-2'>
                            <div className='flex flex-wrap items-center justify-start gap-1'>
                                {tileAgentName.length > 0 && tileAgentName.map((element, key) =>
                                    <div
                                        className="[word-wrap: break-word]   flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] key  px-[10px] py-0 text-[13px] font-normal normal-case leading-loose text-heading shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1]  border border-border" key={key}>
                                        {makeCapital(element.trim())}
                                        <XMarkIcon className=" h-4 w-4 cursor-pointer " onClick={(e) => { RemoveFromAgentNameArr(element) }} />
                                    </div>
                                )}
                            </div>
                            <input value={formValues.agent_name} onKeyDown={handleKeyDown} required onChange={handleAgentNameValue} type={"text"} placeholder={"Enter names separate by ,"} className={` block  px-3 py-2 bg-white  rounded-md  text-sm placeholder-slate-400   placeholder-slate-400  focus:outline-none border  disabled:bg-slate-50 disabled:text-slate-500  w-auto  border-none ring-0 focus:border-none focus-visible:border-none`} id={"agent_name"} name={"agent_name"} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EmailConfig