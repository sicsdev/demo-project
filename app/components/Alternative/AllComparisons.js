import React from 'react'
import { CheckIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
const AllComparisons = () => {
    const tableData = [
        {
            title: (<div className='text-red text-2xl'><p>Why privacy-conscious companies choose Rocket.Chat</p></div>),
            text1: (<div><img src='https://assets-global.website-files.com/611a19b9853b7414a0f6b3f6/6449b100b7e0aa6bf67f6cf7_rocket-chat.webp' className='h-10 w-10'></img></div>),
            text2: (<div><img src='https://assets-global.website-files.com/611a19b9853b7414a0f6b3f6/6449b100666b7f462e2a8453_element.webp' className='h-10 w-10'></img></div>),
            text3: (<div><img src='https://assets-global.website-files.com/611a19b9853b7414a0f6b3f6/6449b1011e8d5811437b2300_mattermost.webp' className='h-10 w-10'></img></div>),
            text4: (<div><img src='https://assets-global.website-files.com/611a19b9853b7414a0f6b3f6/6449b1018793d07fe03d7e8e_slack.webp' className='h-10 w-10'></img></div>),
            text5: (<div><img src='https://assets-global.website-files.com/611a19b9853b7414a0f6b3f6/6449b10030f6591cc3738cb9_ms-teams.webp' className='h-10 w-10'></img></div>),
            text6: (<div><img src='https://assets-global.website-files.com/611a19b9853b7414a0f6b3f6/6449b101011dcc5fd4494338_skype.webp' className='h-10 w-10'></img></div>)
        },
        {
            title: "Digital sovereignty",
            text1: (<div><CheckIcon className="h-5 w-5 text-soft-green" /></div>),
            text2: (<div><CheckIcon className="h-5 w-5 text-soft-green" /></div>),
            text3: (<div><CheckIcon className="h-5 w-5 text-soft-green" /></div>),
            text4: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
            text5: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
            text6: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
        },
        {
            title: "End-to-end encryption",
            text1: (<div><CheckIcon className="h-5 w-5 text-soft-green" /></div>),
            text2: (<div><CheckIcon className="h-5 w-5 text-soft-green" /></div>),
            text3: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
            text4: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
            text5: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
            text6: "Limited",
        }, {
            title: "180+ advanced role-based permissions",
            text1: (<div><CheckIcon className="h-5 w-5 text-soft-green" /></div>),
            text2: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
            text3: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
            text4: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
            text5: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
            text6: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
        }, {
            title: "Deploy on-premise or in a secure cloud",
            text1: (<div><CheckIcon className="h-5 w-5 text-soft-green" /></div>),
            text2: (<div><CheckIcon className="h-5 w-5 text-soft-green" /></div>),
            text3: (<div><CheckIcon className="h-5 w-5 text-soft-green" /></div>),
            text4: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
            text5: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
            text6: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
        }, {
            title: "Interoperability - Federation capabilities built on Matrix",
            text1: (<div><CheckIcon className="h-5 w-5 text-soft-green" /></div>),
            text2: (<div><CheckIcon className="h-5 w-5 text-soft-green" /></div>),
            text3: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
            text4: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
            text5: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
            text6: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
        }, {
            title: "Omnichannel communication (SMS, email, WhatApp, and other)",
            text1: (<div><CheckIcon className="h-5 w-5 text-soft-green" /></div>),
            text2: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
            text3: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
            text4: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
            text5: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
            text6: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
        }, {
            title: "White labeling",
            text1: (<div><CheckIcon className="h-5 w-5 text-soft-green" /></div>),
            text2: (<div><CheckIcon className="h-5 w-5 text-soft-green" /></div>),
            text3: (<div><CheckIcon className="h-5 w-5 text-soft-green" /></div>),
            text4: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
            text5: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
            text6: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
        }, {
            title: "MIT Open Source license (all editions)",
            text1: (<div><CheckIcon className="h-5 w-5 text-soft-green" /></div>),
            text2: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
            text3: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
            text4: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
            text5: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
            text6: (<div><XMarkIcon className="h-5 w-5 text-red" /></div>),
        },

    ]
    return (
        <>
            <div className='my-10'>
                <div className='w-[80%] m-auto sm:block hidden'>
                    <div className='p-10 flex justify-center items-center'>
                        <table>
                            <tr>
                                <th></th>
                                <th className="p-5">Rocket.Chat</th>
                                <th className="p-5">Element</th>
                                <th className="p-5">Mattermost</th>
                                <th className="p-5">Slack</th>
                                <th className="p-5">Microsoft Teams</th>
                                <th className='p-5'>Skype for Business</th>
                            </tr>
                            {tableData.map((ele, key) => (
                                <tr className="" key={key}>
                                    <td className="p-5 text-sm">{ele.title}</td>
                                    <td className="p-5"><div className='flex justify-center items-center'>{ele.text1}</div></td>
                                    <td className="p-5"><div className='flex justify-center items-center'>{ele.text2}</div></td>
                                    <td className="p-5"><div className='flex justify-center items-center'>{ele.text3}</div></td>
                                    <td className="p-5"><div className='flex justify-center items-center'>{ele.text4}</div></td>
                                    <td className="p-5"><div className='flex justify-center items-center'>{ele.text5}</div></td>
                                    <td className="p-5"><div className='flex justify-center items-center'>{ele.text6}</div></td>
                                </tr>
                            ))}
                        </table>
                    </div>

                </div>
            </div>
        </>
    )
}

export default AllComparisons