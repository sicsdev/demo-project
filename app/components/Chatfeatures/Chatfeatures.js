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

    const compData = {
        title: `A shortcut for all the modern <br /> features your chat <span class='text-[#f5455c]'>needs to have</span>`,
        description: `Leverage our easy-to-use and robust chat APIs to build  a chat experience just the way you need. Your customers will love it.`,
        slides: [
            {
                image: '/feature-slider/slide-1.webp',
                title: 'One-to-one or group conversation'
            },
            {
                image: '/feature-slider/slide-2.webp',
                title: 'One-to-one or group conversation'
            },
            {
                image: '/feature-slider/slide-3.webp',
                title: 'One-to-one or group conversation'
            },
            {
                image: '/feature-slider/slide-4.webp',
                title: 'One-to-one or group conversation'
            },
            {
                image: '/feature-slider/slide-5.webp',
                title: 'One-to-one or group conversation'
            },
            {
                image: '/feature-slider/slide-6.webp',
                title: 'One-to-one or group conversation'
            },
        ],
        sliderText: 'Allow users to interact with another through chat, video, voice messaging, and file sharing. Monitor engagement data to learn how they communicate and moderate message content to keep the chat environment compliant with regulatory requirements.',
        bottomHeading: "Customize <span class='text-[#f5455c]'>anything</span> <br /> Integrate everything",
        bottomText: "Integrate with the systems, external channels and apps you use every day to streamline workflows and eliminate context switching. A wide range of integrations and white labeling options to fulfill your unique needs",
        buttonName: 'Find our apps',
        buttonLink: '#',
        bottomImage: '/feature-slider/feature-bottom.png'
    };

    return (
        <div className='bg-black '>
            <div className='relative w-full mx-auto py-[40px] lg:py-[96px] px-[16px]'>
                <img className='absolute right-0 top-0' src="/feature-slider/circles.svg" alt="circle-icon" />
                <div className='max-w-[1090px] mx-auto'>
                    <div className="content">
                        <h2 className="leading-[56px] font-bold text-[34px] sm:text-[45px] mb-[16px] text-white" dangerouslySetInnerHTML={{ __html: compData.title }}></h2>
                        <p className="w-full sm:w-[700px] text-[16px] text-white">{compData.description}</p>
                    </div>

                    <div className="slidercontent chatfeature_slider mt-4 sm:mt-12 mb-4 sm:mb-20">
                        <Slider {...settings}>
                            {compData.slides.map((slide, key) =>
                                <div className='p-2' key={key}>
                                    <img src={slide?.image} loading="lazy" sizes="(max-width: 991px) 100vw, (max-width: 1439px) 32vw, 428.6640625px" alt="slide" />
                                    <h3 className='p-3 bg-[#101826] text-white'>{slide?.title}</h3>
                                </div>
                            )}
                        </Slider>
                    </div>

                    <div className="content">
                        <p className="mt-12 sm:mt-4 w-full sm:w-[700px] text-[16px] text-white">{compData?.sliderText}</p>
                    </div>
                </div>

                <div className='max-w-[1090px] mx-auto sm:mt-8'>
                    <div className='block sm:flex items-center'>
                        <div className="w-full sm:w-[50%] content">
                            <h2 className="leading-[56px] font-bold text-[34px] sm:text-[45px] mb-[16px] text-white" dangerouslySetInnerHTML={{ __html: compData.bottomHeading }}></h2>
                            <p className="mt-4 w-full text-[16px] text-white">{compData?.bottomText}</p>
                            <p className="items-center flex w-full text-[16px] text-white mt-4 sm:mt-8">{compData?.buttonName}
                                <svg className='text-white' width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.4785 6.20831L0.978516 6.20831" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M8.4375 1.18798L13.4792 6.20798L8.4375 11.2288" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </p>
                        </div>

                        <div className="w-full sm:w-[50%] image">
                            <img src={compData?.bottomImage} alt='image' />
                        </div>
                    </div>
                </div>



            </div>
        </div>

    )
}

export default Chatfeatures