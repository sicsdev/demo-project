import { CheckCircleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React from 'react'

const IntegrationTemplates = ({ integrationTiles, performIntegrationTask }) => {
    return (
        <div>
            {integrationTiles.map((element, key) => (
                <div className={` mt-6`} key={key}>
                    <h3 className="text-sm font-semibold mt-3">
                        {element.title}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-2 mx-auto items-center my-2">
                        {element.tiles?.map((item, key) => (
                            <div
                                className={`${item.grayscale && ("pointer-events-none")} ${item.checked && ("bg-[#ECF6FE] border-primary_hover")} border border-border p-3 rounded-md cursor-pointer hover:bg-[#ECF6FE] hover:border-primary_hover`}
                                key={key}
                                onClick={() => { performIntegrationTask(item) }}
                            >
                                <div className="flex justify-start gap-1 items-center relative">
                                    <div className="relative rounded-lg m-auto">
                                        <Image
                                            fill={"true"}
                                            className={`${item.grayscale && ("grayscale pointer-events-none")}  mx-auto rounded-lg !static !w-[20px] !h-auto`}
                                            alt="logo.png"
                                            src={item.logo}
                                        />
                                    </div>
                                    <h3 className="w-[80%] font-semibold text-[13px]  text-heading">
                                        {item.name}
                                    </h3>

                                    {item.checked && (<CheckCircleIcon className="absolute right-[0px] h-5 w-5 text-primary font-semibold " />)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div >
            ))}
        </div>
    )
}

export default IntegrationTemplates