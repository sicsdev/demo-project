'use client'
import React, { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const Carasual = ({ children }) => {
    return (
        <div className='max-w-[1400px]  w-full m-auto sm:py-8 md:py-8 lg:py-8  sm:px-4 px-4 lg:px-4 relative group'>
            <Carousel
                autoPlay={true}
                arrows={true}
                showStatus={false}
                infiniteLoop={true}
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    hasPrev && (
                        <BackArrow onClickHandler={onClickHandler} />
                    )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                    hasNext && (
                        <NextArrow onClickHandler={onClickHandler} />
                    )
                }
                renderIndicator={(onClickHandler, isSelected, index, label) =>
                (
                    <Indicator onClickHandler={onClickHandler} isSelected={isSelected} index={index} />
                )
                }

            >
                {children}
            </Carousel>

        </div>
    );
}



export default Carasual



export const NextArrow = ({ onClickHandler }) => {
    return (
        <div className=' absolute top-[50%] -translate-x-0 translate-y-[-50%] right-2 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer' onClick={onClickHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
        </div>
    )
}
export const BackArrow = ({ onClickHandler }) => {
    return (
        < div className='z-50 absolute top-[50%] -translate-x-0 translate-y-[-50%] left-2 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer' onClick={onClickHandler}  >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>

        </div >
    )
}

export const Indicator = ({ index, onClickHandler, isSelected }) => {
    return (
        <li
            key={index}
            onClick={onClickHandler}
            className={` text-2xl cursor-pointer inline-block ${isSelected ? "text-black" : 'text-input_color'}`}
        >
            <svg className={isSelected ? "text-2xl font-bold w-8 h-8" : "w-8 h-8"} viewBox="0 0 15 15" fill="" xmlns="http://www.w3.org/2000/svg"> <path d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z" fill="currentColor" /> </svg>
        </li>
    )
}