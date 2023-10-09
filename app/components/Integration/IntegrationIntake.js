import Image from 'next/image';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TextField from '../Common/Input/TextField';
import Button from '../Common/Button/Button';
import { tiles_icons } from "@/app/data/icon_data";
import Link from 'next/link';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import { addIntegrationTemplate, updateIntegrationData } from '@/app/API/pages/Integration';
import { errorMessage, successMessage } from '../Messages/Messages';
import { fetchBot, setModalValue } from '../store/slices/botIdSlice';
import { fetchIntegrations } from '../store/slices/integrationSlice';
import { fetchIntegrationsTemplates } from '../store/slices/integrationTemplatesSlice';
import Loading from '../Loading/Loading';

const IntegrationIntake = ({ basicFormData, setBasicFormData, setIntakeStep }) => {
    const dispatch = useDispatch()
    const state = useSelector((state) => state.integrationTemplate);
    const [tiles, setTiles] = useState(basicFormData?.tiles ?? [])
    const [tilesCheck, setTilesCheck] = useState(basicFormData?.tiles ?? [])
    const [stepIds, setStepIds] = useState(basicFormData?.stepIds ?? [])
    const [help, setHelp] = useState(null)
    const [loading, setLoading] = useState(false)
    const [currentStep, setCurrentStep] = useState(0);
    useEffect(() => {
        if (state && state?.data) {
            const filteredData = state.data
                .filter((ele) => {
                    const findData = basicFormData.recommended_integrations.find(
                        (x) => x.toLowerCase() === ele.name.toLowerCase()
                    );
                    return findData !== undefined; // Filter out undefined elements
                })
                .map((ele) => ele);
            setTiles(filteredData)
            performIntegrationTask(filteredData[0])
            setBasicFormData((prev) => {
                return {
                    ...prev,
                    tiles: filteredData,
                }
            })
        }
    }, [state?.data])
    console.log(state)
    const performIntegrationTask = (singleData) => {
        setHelp(tiles_icons.find((ele) => ele.name == singleData.name))
        setStepIds((prev) => {
            setBasicFormData((previous) => {
                return {
                    ...previous,
                    stepIds: [...prev, singleData.id]
                }
            })
            return [...prev, singleData.id]

        })
    }

    const convertToTitleCase = (str) => {
        const words = str.split('_');
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        const result = capitalizedWords.join(' ');
        return result;
    }

    const handleIntegrationInputChange = (e) => {
        const { name, value } = e.target;
        setBasicFormData((prev) => {
            const newData = [...prev.tiles];
            newData[currentStep] = {
                ...newData[currentStep],
                data: {
                    ...newData[currentStep].data,
                    [name]: value,
                },
            };
            setTiles(newData)
            return {
                ...prev,
                tiles: newData,
            };
        });
    };

    const DisablingButton = (step) => {
        if (Object.keys(tiles[step].data).length === 0) {
            return true;
        }
        return Object.values(tiles[step].data).some(field => field.trim() === '');
    };
    const addInteGrations = async () => {
        let payload = {
            name: tiles[currentStep]?.name,
            type: tiles[currentStep]?.type,
            id: tiles[currentStep]?.id || null,
            http_base: tiles[currentStep]?.http_base,
            http_auth_scheme: tiles[currentStep]?.http_auth_scheme,
            data: tiles[currentStep]?.data,
            provider: tiles[currentStep]?.name,
        }
        setLoading(true);
        try {
            let configureIntegration;
            let message;
            if (tiles[currentStep]?.checked === true) {
                configureIntegration = await updateIntegrationData(payload, tiles[currentStep]?.integration_id);
                message = `Integration Updated Successfully!`;
            } else {
                configureIntegration = await addIntegrationTemplate(payload, payload?.id);
                message = `Integration Added Successfully!`;
                setTiles((prevTiles) => [
                    {
                        ...prevTiles[currentStep],
                        checked: true,
                        integration_id: configureIntegration?.data?.id
                    },
                    ...prevTiles.slice(1), // Keep the rest of the tiles unchanged
                ]);
            }
            if (configureIntegration?.status === 201 || configureIntegration?.status === 200) {
                // successMessage(message);
                if (currentStep < tiles.length - 1) {
                    setCurrentStep(currentStep + 1);
                    performIntegrationTask(tiles[currentStep + 1])
                    setLoading(false);
                } else {
                    dispatch(setModalValue(false));
                    dispatch(fetchBot());
                    dispatch(fetchIntegrations)
                    dispatch(fetchIntegrationsTemplates)
                    setLoading(false);
                }
            } else {
                errorMessage("Unable to Proceed!");
                setLoading(false)
            }
        } catch (error) {
            setLoading(false);
            errorMessage("Unable to Proceed!");
        }
    }
    const handleNextStep = async () => {
        setLoading(true)
        if (currentStep < tiles.length - 1) {
            if (DisablingButton(currentStep) === false) {
                addInteGrations()
            } else {
                setCurrentStep(currentStep + 1);
                performIntegrationTask(tiles[currentStep + 1])
                setLoading(false)
            }
        } else {
            if (DisablingButton(currentStep) === false) {
                addInteGrations()
            } else {
                dispatch(setModalValue(false));
                dispatch(fetchBot());
                setLoading(false)
            }
        }
    };
    const handleBackStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            performIntegrationTask(tiles[currentStep - 1])
        } else {
            setIntakeStep(3)
        }
    };


    return (
        <div className='p-2'>
            {tiles.length > 0 && (
                <>
                    <div
                        className={`p-2 rounded-md cursor-pointer    w-full`}
                    >
                        <div className="flex justify-start gap-4 items-center">
                            <div className="relative w-[25px] h-[25px]  rounded-lg">
                                <Image
                                    fill={"true"}
                                    className={`bg-contain mx-auto w-full rounded-lg`}
                                    alt="logo.png"
                                    src={tiles[currentStep].icon}
                                />
                            </div>
                            <h3 className="w-[80%] font-semibold text-[14px]  text-heading">
                                {tiles[currentStep].name}
                            </h3>
                        </div>
                    </div>
                    {stepIds.includes(tiles[currentStep].id) && (
                        <div class="grid grid-cols-1 md:grid-cols-6 items-center sm:gap-4 md:gap-4 lg:gap-4">
                            <div class="col-span-1 md:col-span-4 bg-red-300">
                                {Object.keys(tiles[currentStep].data).map((key) => (
                                    tilesCheck[currentStep]?.data[key] ? null :
                                        <div className='my-2' key={key}>
                                            <TextField
                                                onChange={(e) => handleIntegrationInputChange(e)}
                                                value={tiles[currentStep].data[key] || ''}
                                                name={key}
                                                autoComplete={'off'}
                                                labelClass={"font-bold mb-2"}
                                                className="py-3 mt-2"
                                                title={convertToTitleCase(key)}
                                                placeholder={convertToTitleCase(key)}
                                                type={"text"}
                                                id={key}
                                            />
                                        </div>
                                ))}

                            </div>
                            <div class="col-span-4 md:col-span-2 bg-blue-300">
                                <div className="bg-[#F9F9F9] p-5 rounded-md mt-5 sm:mt-0">
                                    <p className="font-semibold text-sm mb-2">Need help?</p>
                                    <Link href={`${help?.link}`} className="font-normal text-sm flex items-center gap-2 hover:text-primary" target='_blank'>
                                        <BookOpenIcon className="h-4 w-4 text-gray-500" />
                                        <span className="">{help?.ele} Guide</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className='my-2 flex justify-between items-center gap-5'>

                        <Button
                            type={"button"}
                            className="inline-block rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                            // disabled={DisablingButton()}
                            onClick={(e) => handleBackStep()}
                        >
                            {"Back"}
                        </Button>

                        <Button
                            type={"button"}
                            className="inline-block rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                            disabled={Loading === true}
                            onClick={(e) => handleNextStep()}
                        >
                            {loading === true ? <><svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                </svg>
                                                    <span>Loading...</span> </>  : currentStep === tiles.length - 1 ? "Finish" : DisablingButton(currentStep) ? "Skip" : "Next"}
                        </Button>
                    </div>
                </>
            )}
        </div>

    )
}

export default IntegrationIntake