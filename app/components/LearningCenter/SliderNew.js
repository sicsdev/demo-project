"use client"
import React, { useState, useEffect } from 'react'
import { PlusIcon } from "@heroicons/react/24/outline";


const SliderNew = () => {
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);

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
    }, [data.length]);

    return (
        <>
            <div className='bg-[#f7f8fa] py-10'>
                <div className='text-center mb-20'>
                    <p className='text-[42px] font-[600]'>Built for security-centered organizations</p>
                    <p className='text-[16px]'>Adaptable to a wide range of use cases and business needs</p>
                </div>
                <div>
                    {data.map((ele, key) => (
                        <div className='grid grid-cols-2' key={key}>
                            <div className='flex justify-end mr-5'>
                                {selectedItemIndex === key && (
                                    <div>
                                        <img src={ele.image} className='h-[400px] w-[400px]' alt={`Image ${key + 1}`} />
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className='w-[70%] h-[50px'>
                                    <div className='flex cursor-pointer text-2xl font-semibold' onClick={() => handleClick(key)}>
                                        <div>
                                            <p>{ele.number}</p>
                                        </div>
                                        <div className='flex justify-between w-[100%]'>
                                            <p className='ml-3 text-2xl font-semibold'>{ele.title}</p>
                                            <PlusIcon className={`h-6 w-6 text-gray-500 transform `} />
                                        </div>
                                    </div>
                                    {selectedItemIndex === key && (
                                        <div>
                                            <p>{ele.text}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    <hr />
                </div>
            </div>
        </>
    )
}

export default SliderNew