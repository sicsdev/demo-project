import React, { useEffect, useState } from 'react'
import IntegrationForm from './IntegrationForm'

const ConfigureIntegrations = ({ neededIntegrationsToAddAsWorkflow, setShowConfigureIntegrations }) => {

    const [neededIntegrations, setNeededIntegrations] = useState([])

    useEffect(() => {
        if (neededIntegrationsToAddAsWorkflow) { setNeededIntegrations(neededIntegrationsToAddAsWorkflow) }
        console.log(neededIntegrations)
    }, [])

    return (
        <div>
            <div className='rightSlideAnimations sm:bg-[#222023A6] md:bg-[#222023A6] lg:bg-[#222023A6]  fixed top-0 right-0 bottom-0 left-0 overflow-auto  flex flex-col z-50'
                onClick={() => {
                    setShowConfigureIntegrations(false)
                }}
            >

            </div>
            <div className={`integrationspopup mt-[63px] sm:mt-0 md:mt-0 lg:mt-0  z-50 overflow-y-scroll p-5 fixed top-0 right-0 h-full m-auto max-h-[100%] bg-white`}>
                <div>
                    <div className="flex items-center justify-between
             pb-4 pt-2 border-b border-border dark:bg-gray-800
            ">
                        <div class="mb-2 sm:mb-0">
                            <p class="text-black-color text-sm font-semibold">
                                Configure integrations
                            </p>
                        </div>
                    </div>


                    {neededIntegrations?.map(integration =>
                        <IntegrationForm integrationElement={integration}></IntegrationForm>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ConfigureIntegrations