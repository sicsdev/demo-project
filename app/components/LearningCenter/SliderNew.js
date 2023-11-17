"use client"
import React, { useState, useEffect } from 'react'
import { PlusIcon } from "@heroicons/react/24/outline";


const SliderNew = () => {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);

    const handleClick = (index) => {
        setSelectedItemIndex(selectedItemIndex === index ? null : index);
    };

    const data = [
        {
            image: "/SliderNew/Image1.png",
            number: "01",
            title: "Digital Healthcare",
            text: "Centralize all your healthcare conversations under a single, HIPAA-ready messaging app and drive better patient outcomes."
        },
        {
            image: "/SliderNew/Image2.png",
            number: "02",
            title: "E-learning",
            text: "Establish a strong internal and external collaborative environment for students, teachers, and other staff. Increase efficiency and transform the learning experience."
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
    ]
    useEffect(() => {
        const intervalId = setInterval(() => {
            setSelectedItemIndex((prevIndex) => (prevIndex + 1) % data.length);
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, [data.length, data]);

    return (
        <>
            <div className='bg-[#f7f8fa] py-10 sm:px-1 px-4'>
                <div className='text-center mb-20'>
                    <p className='sm:text-[42px] text-3xl sm:font-[600] font-medium'>Built for security-centered organizations</p>
                    <p className='text-[16px] mt-5'>Adaptable to a wide range of use cases and business needs</p>
                </div>
                <div className='grid'>
                    <div className='sm:grid sm:grid-cols-2 block transition-all duration-500'>
                        <div className='sm:flex justify-end mr-20 h-auto hidden'>

                            <div>
                                <img src={data[selectedItemIndex].image} className='h-[700px] w-[500px]' alt={`Image ${selectedItemIndex + 1}`} />
                            </div>

                        </div>
                        <div>
                            {data.map((ele, key) => (
                                <div className='sm:w-[70%] w-[95%]' key={key}>
                                    <div className='flex cursor-pointer text-2xl font-normal my-5' onClick={() => handleClick(key)}>
                                        <div className='text-base mt-1'>
                                            <p>{ele.number}</p>
                                        </div>
                                        <div className='flex justify-between w-[100%]'>
                                            <p className='ml-3 text-2xl font-medium'>{ele.title}</p>
                                            <PlusIcon className={`h-6 w-6 text-gray-500 transform `} />
                                        </div>
                                    </div>
                                    <div className={selectedItemIndex === key ? 'h-auto my-3 ml-8 text-text-dark-color' : 'h-[50px] overflow-hidden'}>
                                        {selectedItemIndex === key ? (
                                            <div>
                                                <p>{ele.text}</p>
                                            </div>
                                        ) : ""}
                                    </div>
                                    <hr className='ml-8' />
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SliderNew