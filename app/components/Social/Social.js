import React from 'react'
import Image from 'next/image'
const Social = () => {
    const images = [
        "paypal.svg",
        "shopify.svg",
        "zapier.svg",
        "gorgias.svg",
        "zendesk-icon-svgrepo-com.svg",
        "freshdesk.svg"

    ]
    return (
        <div className=' bg-[white] py-2 sm:py-10'>
        <div className='my-8  mx-auto max-w-[90%]'>
            <h1 className='text-center font-bold mb-4 sm:mb-0 text-2xl text-blue  md:text-5xl lg:text-5xl sm:text-5xl  '>One platform, infinite possibilities</h1>
            <div className='grid grid-cols-2 sm:grid-cols-6  text-center'>
                {images.map((element, key) =>
                    <div className='relative h-auto w-[100px] py-4 sm:pt-24 m-auto hover:text-white' key={key}>
                        <img
                            src={element}
                            fill={true}
                            alt="Picture of the author"
                            className='m-auto object-contain img-platform mx-auto'
                        />
                    </div>
                )}
            </div>
        </div>
        </div>
    )
}

export default Social