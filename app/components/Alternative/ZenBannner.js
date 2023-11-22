"use client";
import React from 'react'

const ZenBannner = () => {
    return (
        <>
            <div className='sm:grid sm:grid-cols-2 block sm:p-0 p-5'>
                <div className='sm:mt-16 mt-5 sm:w-[90%] w-[100%] m-auto'>
                    <div className='sm:mt-20 mt-0'>
                        <h1 className='sm:mt-20 mt-0 sm:text-[48px] text-[28px] font-semibold'>Looking for a <span className='text-red'> more secure </span>alternative to Deflection AI</h1>
                        <p className='sm:my-10 my-5'>Now that MS Teams is unbundled from the rest of the Office package, you have an opportunity to choose a secure, GDPR-compliant team chat. Ditch Teams and switch to Rocket.Chat now!</p>
                        <button type='button' className='h-10 px-10 bg-red text-xl text-white font-semibold rounded-lg'>Talk an expert</button>
                    </div>
                </div>
                <div>
                    <img src='https://assets-global.website-files.com/611a19b9853b7414a0f6b3f6/6167fcdbf6dfba1fd2ebc59b_hero-img%20(1).webp' className='w-[90%]'></img>
                </div>
            </div>

        </>
    )
}

export default ZenBannner