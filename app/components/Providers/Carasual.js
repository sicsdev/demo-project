'use client'
import React, { useState } from 'react';
import Image from 'next/image';
const Carasual = ({slides}) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <div className='max-w-[1400px]  w-full m-auto sm:py-8 md:py-8 lg:py-8  sm:px-4 px-4 lg:px-4 relative group'>
            <div

                className={`${slides[currentIndex].background} ease-in rounded-2xl bg-center bg-cover duration-1000`}
            >


                <div className="flex items-center justify-center sm:mx-5 md:mx-5 lg:mx-5">
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        <div className="text-lg  col-span-2 font-bold text-center p-10 sm:my-16 md:my-16 lg:my-16  rounded-lg order-2 sm:-order-none md:-order-none lg:-order-none ">
                        <h1 className='text-start sm:text-start md:text-start lg:text-start   text-2xl sm:text-2xl md:text-3xl lg:text-4xl my-2 font-normal text-heading'>
                                {slides[currentIndex].title}
                            </h1>
                            <h3 className='text-start text-xl font-normal text-gray-600'>{slides[currentIndex].editor}</h3>
                            <h3 className='text-start text-xl  font-semibold  text-violet-700'>{slides[currentIndex].position}</h3>
                        </div>

                        <div className="text-lg  font-bold text-center p-10 sm:mt-16 md:mt-16 lg:mt-16  rounded-lg order-1 sm:-order-none md:-order-none lg:-order-none">
                            <Image
                                src={slides[currentIndex].img}
                                width={500}
                                height={500}
                                alt="Picture of the author"
                                className="rounded-3xl"
                            />
                        </div>
                    </div>
                </div>

            </div>
            {/* Left Arrow */}
            <div className=' absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onClick={prevSlide} >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>

            </div>
            {/* Right Arrow */}
            <div className=' absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer' onClick={nextSlide}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </div>
            <div className='flex top-4 justify-center py-2'>
                {slides.map((slide, slideIndex) => (
                    <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className='text-2xl cursor-pointer'
                    >
                       <svg className="w-6 h-6" viewBox="0 0 15 15" fill="grey" xmlns="http://www.w3.org/2000/svg"> <path d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z" fill="currentColor" /> </svg>
                    </div>
                ))}
            </div>
        </div>
    );
}



export default Carasual