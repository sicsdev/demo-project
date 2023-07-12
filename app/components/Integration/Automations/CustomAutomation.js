import React from 'react'

const CustomAutomation = ({ automationData, automationUpdateButton, ...rest }) => {

    return (
        <>
            <div>
                <div className="flex justify-between items-center mt-3">
                    <div className="">
                        <h3 className="font-semibold text-md text-heading">New Custom Automation</h3>
                        <p className="text-sm my-2">Add new custom automatiom</p>
                    </div>
                    <p className="cursor-pointer text-sm" onClick={(e) => automationUpdateButton("", null, 'create', "Custom Automation")}>Configure</p>
                </div>
                <hr className="border-border" />
                {automationData?.length > 0 && automationData?.map((automation, key) => (
                    <div key={key}>
                        <div className="flex justify-between items-center mt-3">
                            <div className="">
                                <h3 className="font-semibold text-md text-heading">{automation?.name}</h3>
                                <p className="text-sm my-2">Configured</p>
                            </div>
                            <p className="cursor-pointer text-sm" onClick={(e) => automationUpdateButton(automation?.name, automation, 'update')}>Edit</p>
                        </div>
                        <hr className="border-border" />
                    </div>
                ))}
            </div>
        </>
    )
}

export default CustomAutomation