"use client"
import { useState, useEffect } from 'react';
import { PlusIcon } from "@heroicons/react/24/outline";
import React from 'react'
import Exceptions from '../LayoutNew/Exceptions'
import HomeComponent from '../Home/HomeComponent';
import SkeletonLoader from '../Skeleton/Skeleton';
import Link from 'next/link';
const HealthCare = ({ defaultLoaderTime = 1000 }) => {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const [pageLoader, setPageLoader] = useState(true);
    const handleClick = (index) => {
        // setSelectedItemIndex(selectedItemIndex === index ? null : index);
        setSelectedItemIndex(selectedItemIndex === index ? index : index);
    };

    useEffect(() => {
        setTimeout(() => {
            setPageLoader(false);
        }, defaultLoaderTime);
    }, []);

    const newData = [
        {
            image: "/SliderNew/Image1.png",
            number: "01",
            title: "Provide exceptional student experience",
            text: "Students can ask questions and stay informed with class- or project-based channels. Professors can keep the conversation going with virtual lectures and online office hours."
        },
        {
            image: "/SliderNew/Image2.png",
            number: "02",
            title: "Integrate with your university’s existing tech stack",
            text: "Using Moodle, Next.Cloud, Jitsi, BBB, Zoom, and other technologies? You can integrate them all with Rocket.Chat."
        },
        {
            image: "/SliderNew/Image3.png",
            number: "03",
            title: "Financial services",
            text: "Redesign the user experience in your mobile banking apps to meet the needs of your customers. Encourage secure communication between bank representatives and clients or user-to-user engagement. "
        },
        {
            image: "/SliderNew/Image4.png",
            number: "04",
            title: "On-demand",
            text: "Communicate with your users in real-time. Simplify the overall efficiency, humanize the service, and reduce booking cancellations."
        },
        {
            image: "/SliderNew/Image5.png",
            number: "05",
            title: "E-commerce and marketplace",
            text: "Encourage buyers and sellers, buyers and buyers, and sellers and sellers to connect and communicate within your app. Increase engagement, conversion rate, and retention."
        },
        {
            image: "/SliderNew/Image5.png",
            number: "06",
            title: "Streamline access management",
            text: "Advanced access management and LDAP/Active Directory integration are crucial for universities with internal and external stakeholders. Manage teacher, student, staff, and guest user access on multiple levels."
        },
    ]
    useEffect(() => {
        const intervalId = setInterval(() => {
            setSelectedItemIndex((prevIndex) => (prevIndex + 1) % newData.length);
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, [newData.length, newData]);

    const data = [
        {
            percentage: "73%",
            body: "of provosts believe they will offer more online courses than before the pandemic",
            text: "Inside Higher Ed"
        },
        {
            percentage: "87%",
            body: "of higher ed institutions say hybrid was the preferred approach to teaching",
            text: "Inside Higher Ed"
        }, {
            percentage: "$447,000",
            body: "the average cost of a ransomware attack against universities in 2020",
            text: "EdScoop"
        }, {
            percentage: "17%",
            body: "of all data breaches in the past decade occurred in higher education",
            text: "EdScoop"
        },
    ]
    const reachData = [
        {
            name: "On-prem or cloud deployment options",
        },
        {
            name: "LDAP/Active Directory integration",
        }, {
            name: "End-to-end encryption",
        }, {
            name: "Data sovereignty",
        }, {
            name: "ISO27001 and GDPR compliant configuration",
        }, {
            name: "Microservices infrastructure (high scalability and availability)",
        }, {
            name: "Designated 24x7 support and professional services",
        },
    ];

    return (
        <>
            <div>

                {/* Banner Component */}
                <div className='sm:grid sm:grid-cols-[60%,40%] grid py-20'>
                    <div className='sm:p-5 p-1'>
                        {pageLoader ? (
                            <div className="sm:ml-10 ml-1">
                                <SkeletonLoader height={90} />
                            </div>
                        ) : (
                            <div className='sm:ml-10 ml-1'>
                                <p className='sm:text-[48px] text-[25px] font-semibold'>Digital learning environment for <span className='text-red'>privacy-conscious </span>universities</p>
                            </div>
                        )}
                        {pageLoader ? (
                            <div className="sm:ml-10 ml-1 mt-4">
                                <SkeletonLoader width={"100%"} height={400} />
                            </div>
                        ) : (
                            <img src='https://assets-global.website-files.com/611a19ba853b746b32f6b402/619e4103f8dee090593b9c0e_secure-communications-platform-education.png' alt='image' className='sm:w-[80%] w-[100%]' />
                        )}
                    </div>
                    <div className='block sm:flex items-center'>
                        <div className='mt-5 sm:mt-0 p-2 sm:p-0'>
                            <div className='w-[100%] max-w-[420px] pl-3 sm:pl-5 border-l-4 border-red '>
                                {pageLoader ? (
                                    <SkeletonLoader width={'100%'} height={150} />
                                ) : (
                                    <p className='leading-[1.8em]'>Deflection AI provides secure hybrid and remote learning environments for higher education institutions, their partners, and other organizations. Over 700 schools and universities across the world use Deflection AI for secure campus communications.</p>
                                )}
                            </div>
                            <div className='mt-[24px] sm:mt-[45px]'>
                                {pageLoader ? (
                                    <SkeletonLoader width={250} height={50} />
                                ) : (
                                    <Link href='/get-trial' className='py-3 px-5 bg-red text-white text-sm font-bold rounded-md '>Try Deflection AI - It{"'"}s Free</Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Second Component */}
                <div>
                    <div className='p-3 sm:p-0 sm:w-[80%] w-[100%] m-auto sm:text-[42px] text-[25px] font-semibold sm:text-center text-left'>
                        {pageLoader ? (
                            <SkeletonLoader height={50} />
                        ) : (
                            <p>Higher ed needs a digital and more secure learning environment</p>
                        )}
                    </div>
                    <div className='sm:grid sm:grid-cols-4 grid sm:w-[95%] w-[100%] m-auto sm:mt-10 mt-5'>
                        {data.map((ele, key) => (
                            <div className='sm:p-8 p-3 sm:mb-10 mb-2' key={key}>
                                {pageLoader ? (
                                    <>
                                        <div className='sm:h-[150px] h-auto'>
                                            <div className='text-[#ff5233] text-4xl my-2 font-semibold'>
                                                <SkeletonLoader height={30} />
                                            </div>
                                            <div className='my-2'>
                                                <SkeletonLoader height={60} />
                                            </div>
                                        </div>
                                        <div className='sm:my-2 my-2 border-b pb-5 text-stronggray'>
                                            <SkeletonLoader height={20} />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className='sm:h-[150px] h-auto'>
                                            <div className='text-[#ff5233] text-4xl my-2 font-semibold'>
                                                {ele.percentage}
                                            </div>
                                            <div className='my-8'>
                                                {ele.body}
                                            </div>
                                        </div>
                                        <div className='sm:my-8 my-2 border-b border-[#cbced1] pb-5 text-stronggray text-[14px]'>
                                            {ele.text}
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='bg-graywhite'>
                <Exceptions defaultLoaderTime={defaultLoaderTime} />
            </div>

            <div className='sm:grid sm:grid-cols-2 grid bg-black my-10 sm:mx-10 mx-0'>

                {pageLoader ? (
                    <div className='m-auto'>
                        <SkeletonLoader width={250} height={150} />
                    </div>
                ) : (
                    <div><img src='https://assets-global.website-files.com/611a19b9853b7414a0f6b3f6/64ee56a3d71943aebc5f8c66_education-banner.webp' alt='image' /></div>
                )}
                <div className='text-white p-5'>
                    {pageLoader ? (
                        <>
                            <SkeletonLoader width={'100%'} height={50} />
                            <SkeletonLoader className='my-5' width={'100%'} height={30} />
                            <SkeletonLoader width={200} height={40} />
                        </>
                    ) : (
                        <>
                            <p className='sm:text-[42px] text-[25px]'>Secure distance learning for Universities and Colleges</p>
                            <p className='my-5'>Learn how you can tackle the technological challenges of digital education in this detailed guide.</p>
                            <button type='button' className='py-3 px-6 bg-red text-white text-lg rounded-md'>Get the Guide</button>
                        </>
                    )}
                </div>
            </div >

            <div className='sm:w-[90%] w-[100%] m-auto text-center sm:my-28 my-10'>
                {pageLoader ? (
                    <>
                        <SkeletonLoader width={250} height={40} />
                        <SkeletonLoader width={300} height={40} />
                        <div className='flex justify-center mt-10'>
                            <SkeletonLoader width={350} height={300} />
                        </div>
                    </>
                ) : (
                    <>
                        <p className='sm:text-[42px] text-[25px] my-5'>Shield your university{"'"}s digital environment</p>
                        <p className='sm:w-[70%] w-[100%] m-auto'>Rocket.Chat is an open-source collaboration platform that puts data privacy first. It offers on-premises deployment that helps universities take full ownership of their data and stay compliant with GDPR and FERPA.</p>
                        <div className='flex justify-center mt-10'>
                            <img src='https://assets-global.website-files.com/611a19ba853b746b32f6b402/619e428a12ba9e3e3d78cf82_GDPR-ready-communications-app-universities.png'></img>
                        </div>
                    </>
                )}
            </div>

            <div className='sm:grid sm:grid-cols-2 grid sm:w-[75%] w-[100%] m-auto sm:my-20 my-10'>
                <div className='p-3 sm:p-0'>
                    {pageLoader ? (
                        <>
                            <SkeletonLoader width={'90%'} height={40} />
                            <SkeletonLoader width={'100%'} height={50} />
                        </>
                    ) : (
                        <>
                            <p className='text-[32px] my-5'>Driving digital transformation in over 700 schools and universities</p>
                            <p className='my-10'>Over 700 universities across the world use Rocket.Chat to improve the hybrid learning experience and securely collaborate with internal and external stakeholders.</p>
                        </>
                    )}
                    <div>

                        {pageLoader ? (
                            <div className='sm:w-[80%] w-[100%] p-5'>
                                <SkeletonLoader width={'100%'} height={70} />
                                <SkeletonLoader width={100} height={20} />
                                <SkeletonLoader width={250} height={20} />
                            </div>
                        ) : (
                            <div className='sm:w-[80%] w-[100%] p-5 border-l-4 border-red '>
                                <p>Rocket.Chat provides secure hybrid and remote learning environments for higher education institutions, their partners, and other organizations. Over 700 schools and universities across the world use Rocket.Chat for secure campus communications.</p>
                                <p className='mt-10'>Alexander Rush</p>
                                <p className='text-stronggray'>Associate Professor at Cornell University</p>
                            </div>
                        )}

                    </div>
                </div>
                <div className='p-3 sm:p-0 sm:ml-10'>
                    {pageLoader ? (
                        <>
                            <SkeletonLoader width={'100%'} height={400} />
                        </>
                    ) : (
                        <img src='https://assets-global.website-files.com/611a19ba853b746b32f6b402/619fa9593162373c29321007_communications-platform-higer-education.png'></img>
                    )}
                </div>
            </div>

            <div>
                <div className="bg-white special">
                    <div className="mx-auto max-w-[90%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[90%] py-10">
                        <div className="grid grid-cols-1 sm:grid-cols-1 sm:mt-12 gap-[30px]  ">
                            <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-[214px]">
                                <div className="">
                                    <div className="hidden sm:block sticky top-[230px]">
                                        <div className='sm:w-[70%] w-[100%]'>
                                            {pageLoader ? (
                                                <>
                                                    <SkeletonLoader width={'100%'} height={50} />
                                                    <SkeletonLoader width={'100%'} height={50} />
                                                    <SkeletonLoader className={'w-full sm:w-[80%]'} height={250} />
                                                </>
                                            ) : (
                                                <>
                                                    <div>
                                                        <p className='sm:text-[32px] text-[25px] my-5'>Helping universities drive and succeed in their digital transformation initiatives</p>
                                                        <p>DX in higher education makes learning more accessible to everyone. Technologies such as Rocket.Chat make education more interactive, customizable, efficient, and streamlined.</p>
                                                    </div>
                                                    <img src={newData[selectedItemIndex]?.image} className='sm:h-[500px] h-auto sm:w-[500px] w-auto' alt={`Image ${selectedItemIndex + 1}`} />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className=" sm:hidden block">
                                        <div className='sm:w-[70%] w-[100%]'>
                                            {pageLoader ? (
                                                <>
                                                    <SkeletonLoader width={'100%'} height={50} />
                                                    <SkeletonLoader width={'100%'} height={50} />
                                                    <SkeletonLoader className={'w-full sm:w-[80%]'} height={250} />
                                                </>
                                            ) : (
                                                <>
                                                    <div>
                                                        <p className='sm:text-[32px] text-[25px] my-5'>Helping universities drive and succeed in their digital transformation initiatives</p>
                                                        <p>DX in higher education makes learning more accessible to everyone. Technologies such as Rocket.Chat make education more interactive, customizable, efficient, and streamlined.</p>
                                                    </div>
                                                    <img src={newData[selectedItemIndex]?.image} className='sm:h-[500px] h-auto sm:w-[500px] w-auto' alt={`Image ${selectedItemIndex + 1}`} />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1">
                                    {newData.map((ele, key) => (
                                        <div
                                            style={{ borderBottom: "1px solid rgba(203, 206, 209, .5)" }}
                                            className={` scroll-child ${key == 0 ? "sm:pt-[0px]" : "sm:pt-[20px]"
                                                }  sm:px-[40px]  `}
                                            key={key}
                                        >
                                            {pageLoader ? (
                                                <div className="flex justify-between flex-row sm:gap-[2rem] gap-4 h-auto">
                                                    <SkeletonLoader className={'w-[10%]'} height={15} width={30} />
                                                    <div className='w-[90%]'>
                                                        <div className='flex cursor-pointer text-2xl font-normal'>
                                                            <div className='flex gap-2 justify-between w-[100%]'>
                                                                <SkeletonLoader height={30} width={200} />
                                                                <SkeletonLoader height={30} width={30} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex justify-between flex-row sm:gap-[2rem] gap-4 h-auto">
                                                    <p className="text-[#2563eb]   text-sm mt-8 sm:mt-3 w-[10%]">
                                                        {" "}
                                                        0{key + 1}{" "}
                                                    </p>
                                                    <div className='w-[90%]'>
                                                        <div className='flex cursor-pointer text-2xl font-normal' onClick={() => handleClick(key)}>
                                                            <div className='flex justify-between w-[100%]'>
                                                                <p className='ml-3 text-2xl font-medium'>{ele.title}</p>
                                                                <PlusIcon className={`h-6 w-6 text-gray-500 transform `} />
                                                            </div>
                                                        </div>
                                                        <div className={selectedItemIndex === key ? 'h-auto my-3 ml-4 text-text-dark-color' : 'h-[50px] overflow-hidden'}>
                                                            {selectedItemIndex === key ? (
                                                                <div>
                                                                    <p>{ele.text}</p>
                                                                </div>
                                                            ) : ""}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-black text-white m-5 sm:p-20 p-4 text-center'>
                <div className='sm:w-[80%] w-[100%] m-auto'>
                    {pageLoader ? (
                        <>
                            <SkeletonLoader className={'w-full sm:w-[70%]'} height={40} />
                            <SkeletonLoader className={'w-full sm:w-[70%]'} height={60} />
                        </>
                    ) : (
                        <>
                            <p className='sm:text-[32px] text-[25px] my-10'>"We{"'"}ve integrated GitLab and Active Directory automation into a channel in Deflection.ai"</p>
                            <p>“From a software design aspect we{"'"}ve integrated GitLab and Active Directory automation into a channel in Deflection.ai. This allows those responsible to quickly get updates on changes in important repositories and status changes affected by automation. All without reading an email.”</p>
                        </>
                    )}

                    <div className='flex sm:gap-10 gap-2 justify-center mt-10 sm:text-[20px] text-[12px]'>
                        {pageLoader ? (
                            <>
                                <SkeletonLoader width={70} height={20} />
                                <SkeletonLoader width={150} height={20} />
                            </>
                        ) : (
                            <>
                                <p>Matthew Gill</p>
                                <p>System Administrator at Southeastern Louisiana University</p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className='my-20'>
                <div className="bg-white special">
                    <div className="mx-auto max-w-[90%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[90%] py-10">
                        <div className="grid grid-cols-1 sm:grid-cols-1 sm:mt-12 gap-[30px]  ">
                            <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-[214px]">
                                <div className="">
                                    <div className="hidden sm:block sticky top-[230px]">
                                        {pageLoader ? (
                                            <>
                                                <SkeletonLoader height={40} />
                                                <SkeletonLoader height={60} />
                                            </>
                                        ) : (
                                            <>
                                                <h1 className="mb-5 sm:mt-0 mt-5 text-black px-3 text-2xl sm:text-[38px] font-bold sm:mb-0 sm:leading-[1.4em] text-center sm:text-start">
                                                    Why privacy-conscious universities choose Rocket.Chat?
                                                </h1>
                                                <p className='my-0 sm:my-5'>Privacy-conscious universities use Rocket.Chat because it offers on-prem deployment. Our Enterprise edition is built to make sure your university complies with the most rigorous regulations.</p>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1">
                                    {reachData.map((ele, key) => (
                                        <div
                                            style={{ borderBottom: "1px solid rgba(203, 206, 209, .5)" }}
                                            className={` scroll-child ${key == 0 ? "sm:pt-[0px]" : "sm:pt-[20px]"
                                                } ${key == 2 ? "sm:pb-[0px] !border-b-0" : "sm:pb-[16px]"
                                                } sm:px-[40px]  `}
                                            key={key}
                                        >
                                            {pageLoader ? (
                                                <>
                                                    <div className="flex flex-row sm:gap-[2rem] gap-4 h-[90px]">
                                                        <SkeletonLoader height={20} width={50} />
                                                        <SkeletonLoader height={30} width={200} />
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="flex flex-row sm:gap-[2rem] gap-4 h-[90px]">
                                                    <p className="text-[#2563eb]   text-sm mt-8 sm:mt-3">
                                                        {" "}
                                                        0{key + 1}{" "}
                                                    </p>
                                                    <p className="text-[heading] text-sm mt-8 sm:mt-3 sm:text-[24px] leading-[1.4em]">
                                                        {ele.name}
                                                    </p>
                                                </div>
                                            )}

                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <HomeComponent defaultLoaderTime={defaultLoaderTime} />
            </div>
        </>
    )
}

export default HealthCare