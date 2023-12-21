import { createWorkflowUsingTemplate } from '@/app/API/pages/Workflow';
import SkeletonLoader from '@/app/components/Skeleton/Skeleton';
import { makeCapital } from '@/app/components/helper/capitalName';
import { capitalizeFirstLetter } from '@/app/components/helper/firstLetterCapital';
import { ArrowUturnLeftIcon, ClipboardDocumentListIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

const GlobalTemplateCard = ({ item, loading, key }) => {
    const router = useRouter()

    const getIntegrationIcon = (automations, name = "") => {
        const getIcon = automations?.find((x) => x?.automation?.integration?.icon !== null && x?.automation?.integration?.icon !== "");

        if (getIcon !== undefined && getIcon?.automation?.integration?.icon !== undefined) {
            return getIcon?.automation?.integration?.icon;
        }
        return null;
    };

    const handleRedirect = () => {
        router.push(`/dashboard/workflow/workflow-builder/templates-manager?templateId=${item.id}`)
    }

    const handleCreateWorkflowBasedInTemplate = async () => {
        await createWorkflowUsingTemplate(item.id)
    }

    return (
        <div
            onClick={handleRedirect}
            key={key}
            className={`relative border border-[#F0F0F1] p-3 rounded-md bg-white h-[200px] shadow-md hover:border-3 hover:border-[#8d8d8d] cursor-pointer`}
        >

            <div className='relative h-full'>

                <div className='flex items-center justify-start gap-2'>

                    {item.icon && (
                        loading ?
                            <SkeletonLoader className="mr-2" count={1} height={30} width={40} /> :
                            <div className="relative w-[25px] h-[25px] gap-2 rounded-lg" onClick={(e) => { e.stopPropagation() }}>
                                {item.icon}
                            </div>
                    )}

                    {getIntegrationIcon(item?.automations, item?.name) !== null && (
                        <div className="relative w-[25px] h-[25px] gap-2 rounded-lg" >
                            {loading ?
                                <SkeletonLoader className="mr-2" count={1} height={30} width={40} />
                                :
                                <Image
                                    fill={"true"}
                                    className="bg-contain mx-auto object-scale-down w-full rounded-lg"
                                    alt="logo.png"
                                    src={getIntegrationIcon(item?.automations, item?.name)}
                                />
                            }
                        </div>
                    )}
                    {item?.automations?.length > 0 && item?.automations?.map((element, index) =>
                        (element?.automation === null) && (
                            <div key={index} className="relative w-[25px] h-[25px] gap-2 rounded-lg">
                                {element.condition && element.condition !== "" && (
                                    <>
                                        {loading ?
                                            <SkeletonLoader count={1} height={30} width={40} />
                                            :
                                            <ClipboardDocumentListIcon className="h-6 w-6 text-gray-500" />
                                        }
                                    </>
                                )}

                                {element?.question && element?.question !== "" && (
                                    <>
                                        {loading ?
                                            <SkeletonLoader count={1} height={30} width={40} />
                                            :
                                            <ArrowUturnLeftIcon className="h-6 w-6 text-gray-500" />
                                        }

                                    </>
                                )}

                                {element?.transformer && element?.transformer !== "" && (
                                    <>
                                        {loading ?
                                            <SkeletonLoader count={1} height={30} width={40} />
                                            :
                                            <PuzzlePieceIcon className="h-6 w-6 text-gray-500" />
                                        }
                                    </>
                                )}
                            </div>
                        )
                    )}

                </div>
                <div className=''
                >
                    <h2 className='text-[#151D23] !font-bold mt-2 text-base'>
                        {loading ?
                            <SkeletonLoader count={1} height={30} width="70%" />
                            :
                            <>
                                {item.name === 'Default_name' ? "New Workflow 1" : makeCapital(item.name)}
                            </>
                        }</h2>
                    <p className='text-xs text-black mt-1'>

                        {loading ?
                            <SkeletonLoader count={1} height={20} width="50%" />
                            :
                            <>
                                By Deflection AI
                            </>
                        }
                    </p>
                    <p className='text-xs text-[#151d23cc] mt-1'>
                        {/* {loading ?
                            <SkeletonLoader count={1} height={20} width="50%" />
                            :
                            <>
                                {capitalizeFirstLetter(item.source)}
                            </>
                        } */}
                        Template
                    </p>
                </div>
                <div className='absolute w-full bottom-0 flex items-center justify-end'>
                    <div className=' text-end'>

                        <>
                            <p className={`${item.active ? 'text-danger' : 'text-success'}  cursor-pointer hover:font-semibold text-xs`} onClick={(e) => {
                                e.stopPropagation();
                                handleCreateWorkflowBasedInTemplate()
                            }}>
                                {loading ?
                                    <SkeletonLoader count={1} height={30} width={50} />
                                    : <>
                                        Create workflow based in this template
                                    </>
                                }</p>
                        </>


                    </div>
                </div>
            </div>

        </div>
    )
}

export default GlobalTemplateCard