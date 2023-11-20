import React from 'react'
import Exceptions from '../LayoutNew/Exceptions'
const HealthCare = () => {
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
                <div className='grid grid-cols-[60%,40%] py-10'>
                    <div className='p-5'>
                        <div className='ml-10'>
                            <p className='text-[48px] font-semibold'>Digital learning environment for privacy-conscious universities</p>
                        </div>
                        <img src='https://assets-global.website-files.com/611a19ba853b746b32f6b402/619e4103f8dee090593b9c0e_secure-communications-platform-education.png' alt='image' className='w-[80%]' ></img>
                    </div>
                    <div className='flex items-center'>
                        <div>
                            <div className='w-[60%] p-5 border-l-4 border-red '>
                                <p>Rocket.Chat provides secure hybrid and remote learning environments for higher education institutions, their partners, and other organizations. Over 700 schools and universities across the world use Rocket.Chat for secure campus communications.</p>
                            </div>
                            <div className='mt-5'>
                                <button type='button' className='h-10 px-10 bg-red text-white text-lg rounded-md'>Try Deflection AI - It{"'"}s Free</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='w-[80%] m-auto text-[42px] font-semibold text-center'>
                        <p>Higher ed needs a digital and more secure learning environment</p>
                    </div>
                    <div className='grid grid-cols-4 w-[95%] m-auto mt-10'>
                        {data.map((ele, key) => (
                            <div className='p-8 mb-10' key={key}>
                                <div className='h-[150px]'>
                                    <div className='text-[#ff5233] text-4xl my-2 font-semibold'>
                                        {ele.percentage}
                                    </div>
                                    <div className='my-8'>
                                        {ele.body}
                                    </div>
                                </div>
                                <div className='my-8 border-b pb-5 text-stronggray'>
                                    {ele.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='bg-graywhite'>
                <Exceptions />
            </div>
            <div className='grid grid-cols-2 bg-black my-10 mx-10'>
                <div>
                    <img src='https://assets-global.website-files.com/611a19b9853b7414a0f6b3f6/64ee56a3d71943aebc5f8c66_education-banner.webp' ></img>
                </div>
                <div className='text-white p-5'>
                    <p className='text-[42px]'>Secure distance learning for Universities and Colleges</p>
                    <p className='my-5'>Learn how you can tackle the technological challenges of digital education in this detailed guide.</p>
                    <button type='button' className='h-10 px-10 bg-red text-white text-lg rounded-md'>Get the Guide</button>
                </div>
            </div>
            <div className='w-[90%] m-auto text-center my-28'>
                <p className='text-[42px] my-5'>Shield your university{"'"}s digital environment</p>
                <p className='w-[70%] m-auto'>Rocket.Chat is an open-source collaboration platform that puts data privacy first. It offers on-premises deployment that helps universities take full ownership of their data and stay compliant with GDPR and FERPA.</p>
                <div className='flex justify-center mt-10'>
                    <img src='https://assets-global.website-files.com/611a19ba853b746b32f6b402/619e428a12ba9e3e3d78cf82_GDPR-ready-communications-app-universities.png'></img>
                </div>
            </div>
            <div className='grid grid-cols-2 w-[75%] m-auto my-20'>
                <div>
                    <p className='text-[32px] my-5'>Driving digital transformation in over 700 schools and universities</p>
                    <p className='my-10'>Over 700 universities across the world use Rocket.Chat to improve the hybrid learning experience and securely collaborate with internal and external stakeholders.</p>
                    <div>
                        <div className='w-[80%] p-5 border-l-4 border-red '>
                            <p>Rocket.Chat provides secure hybrid and remote learning environments for higher education institutions, their partners, and other organizations. Over 700 schools and universities across the world use Rocket.Chat for secure campus communications.</p>
                            <p className='mt-10'>Alexander Rush</p>
                            <p className='text-stronggray'>Associate Professor at Cornell University</p>
                        </div>
                    </div>
                </div>
                <div className='ml-10'>
                    <img src='https://assets-global.website-files.com/611a19ba853b746b32f6b402/619fa9593162373c29321007_communications-platform-higer-education.png'></img>
                </div>
            </div>
            <div className='my-20'>
                <div className="bg-white special">
                    <div className="mx-auto max-w-[90%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[90%] py-10">
                        <div className="grid grid-cols-1 sm:grid-cols-1 sm:mt-12 gap-[30px]  ">
                            <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-[214px]">
                                <div className="">
                                    <div className="hidden sm:block sticky top-[230px]">
                                        <h1 className="mb-5 sm:mt-0 mt-5 text-black px-3 text-justify text-2xl sm:text-[38px] font-bold sm:mb-0 sm:leading-[1.4em]">
                                            Why privacy-conscious universities choose Rocket.Chat?
                                        </h1>
                                        <p className='my-5'>Privacy-conscious universities use Rocket.Chat because it offers on-prem deployment. Our Enterprise edition is built to make sure your university complies with the most rigorous regulations.</p>
                                    </div>
                                    <div className=" sm:hidden block">
                                        <h1 className="mb-5 sm:mt-0 mt-5 text-black px-3 text-center text-2xl sm:text-[38px] font-bold sm:mb-0">
                                            Why privacy-conscious universities choose Rocket.Chat?
                                        </h1>
                                        <p>Privacy-conscious universities use Rocket.Chat because it offers on-prem deployment. Our Enterprise edition is built to make sure your university complies with the most rigorous regulations.</p>
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
                                            <div className="flex flex-row sm:gap-[2rem] gap-4 h-[90px]">
                                                <p className="text-[#2563eb]   text-sm mt-8 sm:mt-3">
                                                    {" "}
                                                    0{key + 1}{" "}
                                                </p>
                                                <p className="text-[heading] text-sm mt-8 sm:mt-3 sm:text-[24px] leading-[1.4em]">
                                                    {ele.name}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </>
    )
}

export default HealthCare