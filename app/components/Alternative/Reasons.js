import React from 'react'

const Reasons = () => {
    const data = [
        {
            number: "1",
            title: "You are not forced to use MS Teams together with Office anymore",
            body: "Microsoft has unbundled Teams from the rest of the Office suite and now it is purchased separately. Now, you have more choice in choosing your collaboration software. Why not go for a more secure, GDPR-compliant tool like Rocket.Chat?"
        },
        {
            number: "2",
            title: "Decide where to house your data - On-premise or in the cloud",
            body: "MS teams is a cloud-based offering that doesn't support on-premise deployment. Rocket.Chat offers numerous deployment options and even allows for air-gapped deployments, which is critical for security-conscious organizations."
        }, {
            number: "3",
            title: "Rocket.Chat lets you connect with MS Teams and Slack users",
            body: "MS Teams lets you message people in other companies, such as vendors, partners, and suppliers - as long as they are also using Microsoft Teams. Rocket.Chat lets you connect across platforms - so you don't ever have to ask: Are you on Teams?",
            image: "/Security V2 1.png"
        }, {
            number: "4",
            title: "Data security and protection in every conversation",
            body: "MS Teams is a SaaS-only solution. While the cloud security is robust, the data still flows through somebody else's servers, making it susceptible to attacks. Besides the self-manage deployment option, Rocket.Chat offers an extra layer of data protection."
        }, {
            number: "5",
            title: "Single secure platform for chat messages, video conferencing & projects",
            body: "Rocket.Chat and Pexip's joint offering allows organizations to consolidate their chat messages, video communication, and projects into a single location while maintaining the security of their data."
        }, {
            number: "6",
            title: "The ecosystem of apps beyond Microsoft world",
            body: "Rocket.Chat works for any organization, regardless of their existing tech stack. It offers an ecosystem of app plugins across platforms (beyond Microsoft world), made available via our marketplace."
        }, {
            number: "7",
            title: "Rocket.Chat is an open-source software, while MS Teams is proprietary.",
            body: "Microsoft Teams is proprietary (closed-source), which limits the possibilities of customizations and creates uncertainties about data ownership and control. Rocket.Chat offers unlimited customizations, and the users can influence the roadmap."
        },
    ]
    return (
        <>
            <div className='sm:w-[50%] w-auto m-auto my-20'>
                <div className="bg-[url('https://assets-global.website-files.com/611a19b9853b7414a0f6b3f6/61279145b52d0ff82a600739_circle-bg.svg')]  bg-no-repeat text-center pt-[160px] mb-10 overflow-hidden sm:block hidden">
                    <div>
                        <h1 className='sm:text-[42px] text-[26px] font-semibold'>Here are 7 reasons why companies pick Rocket.Chat over MS Teams</h1>
                    </div>
                </div>
            </div>

            {data.map((ele, key) => (
                <div className='bg-[#f7f8fa] my-20 pb-20' key={key}>
                    <div className='flex justify-center items-center'>
                        <div className='flex justify-center items-center bg-red h-14 w-14 rounded-full relative mt-[-25px]'>
                            <p className='text-xl text-white'>{ele.number}</p>
                        </div>
                    </div>
                    <div className='grid sm:grid-cols-2 grid-col-1'>
                        <div className='sm:w-[60%] w-auto m-auto py-20 flex justify-end'>
                            <h1 className='sm:text-[42px] sm:px-auto px-5 text-[26px] font-medium'>{ele.title}</h1>
                        </div>
                        <div className='sm:py-20 py-10 sm:w-[70%] sm:px-auto px-5 w-auto'>
                            <p>{ele.body}</p>
                        </div>
                    </div>
                    <div>
                        <img src={ele.image}></img>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Reasons