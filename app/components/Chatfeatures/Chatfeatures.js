import React from 'react';
import Slider from "react-slick";

const Chatfeatures = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ]
    };

    const compData = {};

    return (
        <div className='bg-black '>
            <div className='relative w-full mx-auto py-[40px] lg:py-[96px] px-[16px]'>
                <img className='absolute right-0 top-0' src="https://assets-global.website-files.com/611a19b9853b7414a0f6b3f6/63d80350b86888a25d8f154e_circles.svg" alt="" />
                <div className='max-w-[1090px] mx-auto'>
                    <div className="content">
                        <h2 className="mb-4 leading-[56px] font-bold text-[34px] sm:text-[45px] mb-[16px] text-white">A shortcut for all the modern <br />
                            features your chat <span className='text-[#f5455c]'>needs to have</span></h2>
                        <p className="w-full sm:w-[700px] text-[16px] text-white">Leverage our easy-to-use and robust chat APIs to build  a chat experience just the way you need. Your customers will love it.</p>
                    </div>

                    <div className="slidercontent chatfeature_slider mt-4 sm:mt-12 mb-4 sm:mb-20">
                        <Slider {...settings}>
                            <div className='p-2'>
                                <img src="https://assets-global.website-files.com/611a19b9853b7414a0f6b3f6/63d0918fb378db750808a624_Messaging%20essentials.webp" loading="lazy" sizes="(max-width: 991px) 100vw, (max-width: 1439px) 32vw, 428.6640625px" alt="" />
                                <h3 className='p-3 bg-[#101826] text-white'>One-to-one or group conversation</h3>
                            </div>
                            <div className='p-2'>
                                <img src="https://assets-global.website-files.com/611a19b9853b7414a0f6b3f6/63d0919032a91d10060f947f_Multiple%20messaging%20formats.webp" loading="lazy" sizes="(max-width: 991px) 100vw, (max-width: 1439px) 32vw, 428.6640625px" alt="" />
                                <h3 className='p-3 bg-[#101826] text-white'>One-to-one or group conversation</h3>
                            </div>
                            <div className='p-2'>
                                <img src="https://assets-global.website-files.com/611a19b9853b7414a0f6b3f6/63d09190a383ce773aa19f03_One-to-one%20or%20group%20conversation.webp" loading="lazy" sizes="(max-width: 991px) 100vw, (max-width: 1439px) 32vw, 428.6640625px" alt="" />
                                <h3 className='p-3 bg-[#101826] text-white'>One-to-one or group conversation</h3>
                            </div>
                            <div className='p-2'>
                                <img src="https://assets-global.website-files.com/611a19b9853b7414a0f6b3f6/63d09190a383ce773aa19f03_One-to-one%20or%20group%20conversation.webp" loading="lazy" sizes="(max-width: 991px) 100vw, (max-width: 1439px) 32vw, 428.6640625px" alt="" />
                                <h3 className='p-3 bg-[#101826] text-white'>One-to-one or group conversation</h3>
                            </div>
                            <div className='p-2'>
                                <img src="https://assets-global.website-files.com/611a19b9853b7414a0f6b3f6/63d09190181a3f3cc6215d18_User%20moderation.webp" loading="lazy" sizes="(max-width: 991px) 100vw, (max-width: 1439px) 32vw, 428.6640625px" alt="" />
                                <h3 className='p-3 bg-[#101826] text-white'>One-to-one or group conversation</h3>
                            </div>
                            <div className='p-2'>
                                <img src="https://assets-global.website-files.com/611a19b9853b7414a0f6b3f6/63d09190181a3f8137215d12_Analytics.webp" loading="lazy" sizes="(max-width: 991px) 100vw, (max-width: 1439px) 32vw, 428.6640625px" alt="" />
                                <h3 className='p-3 bg-[#101826] text-white'>One-to-one or group conversation</h3>
                            </div>
                        </Slider>
                    </div>

                    <div className="content">
                        <p className="mt-12 sm:mt-4 w-full sm:w-[700px] text-[16px] text-white">Allow users to interact with another through chat, video, voice messaging, and file sharing. Monitor engagement data to learn how they communicate and moderate message content to keep the chat environment compliant with regulatory requirements.</p>
                    </div>
                </div>

                <div className='max-w-[1090px] mx-auto sm:mt-8'>
                    <div className='block sm:flex items-center'>
                        <div className="w-full sm:w-[50%] content">
                            <h2 className="mb-4 leading-[56px] font-bold text-[34px] sm:text-[45px] mb-[16px] text-white">Customize <span className='text-[#f5455c]'>anything</span> <br /> Integrate everything </h2>
                            <p className="mt-4 w-full text-[16px] text-white">Integrate with the systems, external channels and apps you use every day to streamline workflows and eliminate context switching. A wide range of integrations and white labeling options to fulfill your unique needs</p>
                            <p className="items-center flex w-full text-[16px] text-white mt-4 sm:mt-8">Find our apps
                                <svg className='text-white' width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.4785 6.20831L0.978516 6.20831" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M8.4375 1.18798L13.4792 6.20798L8.4375 11.2288" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </p>
                        </div>

                        <div className="w-full sm:w-[50%] image">
                            <img src='https://assets-global.website-files.com/611a19b9853b7414a0f6b3f6/63ee78f72495ac4e5cde5063_Group%204581-p-500.png' alt='' />
                        </div>
                    </div>
                </div>



            </div>
        </div>

    )
}

export default Chatfeatures