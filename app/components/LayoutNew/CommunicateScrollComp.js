import React from 'react'

const CommunicateScrollComp = () => {

    const compData = {
        title: `Communicate anytime, anywhere`,
        description: `Remote, hybrid, async work is here to stay. Connect with anyone inside or outside your organization and start collaborating more effectively.`,
        image: `/MicrosoftTeams-image.png`,
        icons: [
            {
                icon: `/icons/message-icon.svg`,
                name: `Messages`,
                content: `Use one-on-one messaging to communicate privately or group messaging to connect with teams.`
            },
            {
                icon: `/icons/channel-icon.svg`,
                name: `Channels`,
                content: `Use private channels to collaborate with your team and public channels for company-wide communications`
            },
            {
                icon: `/icons/discussion-icon.svg`,
                name: `Discussions`,
                content: `Use discussions for short-term projects and questions that need quick attention.`
            },
            {
                icon: `/icons/audio-icon.svg`,
                name: `Audio & video calls`,
                content: `Leverage video conferencing integrations to share information more efficiently, so that work gets done faster.`
            },
        ]
    };

    return (
        <div className='bg-white w-full p-8 px-4 lg:pt-32 lg:pl-36'>
            <div className='block md:flex'>
                <div className='w-full md:w-1/2'>
                    <div className='sticky top-[130px]'>
                        <h2 className="block !font-[700] text-2xl md:text-[38px] mb-[1rem] md:mb-8 relative text-heading md:leading-[3rem]">{compData?.title}</h2>
                        <p className='text-base	w-full md:w-4/5 mb-6'>{compData?.description}</p>
                        <img className="w-full md:w-4/5" alt='image' src={compData?.image} />
                    </div>
                </div>
                <div className='w-full md:w-auto flex justify-start grow shrink'>
                    <div className='max-w-auto md:max-w-[420px] mt-[50px] md:mt-0'>
                        {compData?.icons.map((ele, key) =>
                            <div className='sticky py-[25px] md:py-[36px] px-0 md:px-[36px]' key={key}>
                                <img src={ele?.icon} alt='icon' className='pb-[30px]' />
                                <h3 className='text-[24px] !font-semibold leading-9 pb-[12px]'>{ele?.name}</h3>
                                <p className='text-sm'>{ele?.content}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommunicateScrollComp