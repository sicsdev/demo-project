import React from 'react'
import { CheckIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";




const Comparison = () => {

    const tableData = [
        {
            title: (<div className='text-red text-2xl'><p>Open Source</p></div>),
            text1: "",
            text2: ""
        },
        {
            title: "Full access to source code, server APIs, libraries, and influence on the roadmap ",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><XMarkIcon className="h-6 w-6 text-red" /></div>)
        },
        {
            title: (<div className='text-red text-2xl'><p>Hosting</p></div>),
            text1: "",
            text2: ""
        },
        {
            title: "SaaS",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>)
        }, {
            title: "Self-hosted ",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><XMarkIcon className="h-6 w-6 text-red" /></div>)
        },
        {
            title: "On-premise",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><XMarkIcon className="h-6 w-6 text-red" /></div>)
        },
        {
            title: (<div className='text-red text-2xl'><p>Team collaboration features</p></div>),
            text1: "",
            text2: ""
        },
        {
            title: "Teams and channels",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>)
        }, {
            title: "Discussions",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><XMarkIcon className="h-6 w-6 text-red" /></div>)
        }, {
            title: "Voice, video, and screen sharing",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>)
        },
        {
            title: "File, image, and link sharing",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>)
        }, {
            title: "Unlimited message history",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>)
        }, {
            title: "Unlimited channels",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><XMarkIcon className="h-6 w-6 text-red" /></div>)
        }, {
            title: "Federation (connect across other platforms and servers)",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><XMarkIcon className="h-6 w-6 text-red" /></div>)
        }, {
            title: "High availability (deploy in multiple instances to form a cluster)",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><XMarkIcon className="h-6 w-6 text-red" /></div>)
        }, {
            title: "Read receipt",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><XMarkIcon className="h-6 w-6 text-red" /></div>)
        }, {
            title: "White labeling",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><XMarkIcon className="h-6 w-6 text-red" /></div>)
        }, {
            title: "Integrations beyond MS Teams apps",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><XMarkIcon className="h-6 w-6 text-red" /></div>)
        },
        {
            title: (<div className='text-red text-2xl'><p>Customer service features</p></div>),
            text1: "",
            text2: ""
        },
        {
            title: "Manual & Auto Chat Routing",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><XMarkIcon className="h-6 w-6 text-red" /></div>)
        }, {
            title: "Queue Management",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><XMarkIcon className="h-6 w-6 text-red" /></div>)
        }, {
            title: "Agent office hours configuration",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><XMarkIcon className="h-6 w-6 text-red" /></div>)
        }, {
            title: "Facebook,  Whatsapp, Twitter Integrations",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><XMarkIcon className="h-6 w-6 text-red" /></div>)
        }, {
            title: "Email Inbox",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><XMarkIcon className="h-6 w-6 text-red" /></div>)
        }, {
            title: "SMS & CRM integrations",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><XMarkIcon className="h-6 w-6 text-red" /></div>)
        }, {
            title: "Analytics and Real-time monitoring dashboards",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><XMarkIcon className="h-6 w-6 text-red" /></div>)
        }, {
            title: "Chat tagging and forwarding",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><XMarkIcon className="h-6 w-6 text-red" /></div>)
        },
        {
            title: (<div className='text-red text-2xl'><p>Data sovereignty</p></div>),
            text1: "",
            text2: ""
        },
        {
            title: "Private network deployment (SaaS or Self-managed)",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><XMarkIcon className="h-6 w-6 text-red" /></div>)
        }, {
            title: "No third party monitoring",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><XMarkIcon className="h-6 w-6 text-red" /></div>)
        }, {
            title: "Verifiable data retention policies in every plan",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><XMarkIcon className="h-6 w-6 text-red" /></div>)
        }, {
            title: "Post incidents reports",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><XMarkIcon className="h-6 w-6 text-red" /></div>)
        },
        {
            title: (<div className='text-red text-2xl'><p>Privacy</p></div>),
            text1: "",
            text2: ""
        },
        {
            title: "End-to-end encryption of all data",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><XMarkIcon className="h-6 w-6 text-red" /></div>)
        }, {
            title: "ISO 27001 (external audit)",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>)
        }, {
            title: "Data loss prevention (DLP)",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>)
        }, {
            title: "SSO beyond Office 365 Apps",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><XMarkIcon className="h-6 w-6 text-red" /></div>)
        }, {
            title: "Multifactor authentication in every plan",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><XMarkIcon className="h-6 w-6 text-red" /></div>)
        }, {
            title: "ID-only push notifications",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><XMarkIcon className="h-6 w-6 text-red" /></div>)
        },
        {
            title: (<div className='text-red text-2xl'><p>Apps</p></div>),
            text1: "",
            text2: ""
        }, {
            title: "Native apps for iOS, Android, Windows, Mac and Linux",
            text1: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>),
            text2: (<div><CheckIcon className="h-6 w-6 text-soft-green" /></div>)
        },
    ]
    return (
        <>
            <div className='my-20'>
                <div className='text-center w-[70%] m-auto'>
                    <h1 className='text-[42px] my-10 font-semibold'>Still not convinced? No problem.</h1>
                    <p>Here{"'"}s an in-depth feature comparison of Rocket.Chat vs Microsoft Teams.</p>
                </div>
            </div>
            <div className='p-10 flex justify-center items-center'>
                <table>
                    <tr>
                        <th></th>
                        <th className="border border-gray p-5">Deflection AI</th>
                        <th className="border border-gray p-5">Tempo AI</th>
                    </tr>
                    {tableData.map((ele, key) => (
                        <tr className="border border-gray" key={key}>
                            <td className="border border-gray p-5">{ele.title}</td>
                            <td className="border border-gray p-5"><div className='flex justify-center items-center'>{ele.text1}</div></td>
                            <td className="border border-gray p-5"><div className='flex justify-center items-center'>{ele.text2}</div></td>
                        </tr>
                    ))}
                    {/* <tr className="border">
                        <td className="border">Open Source</td>
                        <td className="border"></td>
                        <td className="border"></td>
                    </tr>
                    <tr className="border">
                        <td className="border">Full access to source code, server APIs, libraries, and influence on the roadmap </td>
                        <td className="border"><CheckIcon className="h-6 w-6 text-soft-green" /></td>
                        <td className="border"><XMarkIcon className="h-6 w-6 text-red" /></td>
                    </tr> */}
                </table>
            </div>



            {/* <CheckIcon className="h-6 w-6 text-soft-green" />
            <XMarkIcon className="h-6 w-6 text-red" /> */}

        </>
    )
}

export default Comparison