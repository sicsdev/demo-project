import React from 'react'
import Image from 'next/image'
const Social = () => {
    const images = [
        "paypal.svg",
        "shopify.svg",
        "zapier.svg",
        "gorgias.svg",
        "zendesk.svg",

    ]
    return (
        <div className='bg-cyan-50 py-0'>
        <div className='my-8  mx-auto max-w-[90%]'>
            <h1 className='text-center font-bold  text-2xl text-blue  md:text-5xl lg:text-5xl sm:text-5xl'>One platform, infinite possibilities</h1>
            <div className='block sm:flex md:flex lg:flex justify-evenly items-center text-center'>

                {images.map((element, key) =>
                    <div className='relative h-[50px] w-[60px] py-20 mx-auto sm:m-0 md:m-0 lg:m-0 hover:text-white' key={key}>
                        <Image
                            src={element}
                            fill={true}
                            alt="Picture of the author"
                            className='m-auto object-contain img-div'
                        />
                    </div>
                )}
            </div>
        </div>
        </div>
    )
}

export default Social