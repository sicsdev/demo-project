import React from 'react'
import Image from 'next/image'
const DTC = () => {
    const images = [
        "nextmed.svg",
        "simplesentiments.svg",
        "labpass.svg",
        "perry.svg",
    ]
    return (
        <div className='bg-cyan-50 py-0'>
        <div className='my-8  mx-auto max-w-[90%]'>
            <h1 className='text-center font-normal'>Trusted by top ecommerce and digital services brands</h1>
            <div className='block sm:flex md:flex lg:flex justify-evenly items-center text-center'>

                {images.map((element, key) =>
                    <div className='relative h-[100px] w-[120px] mx-auto sm:m-0 md:m-0 lg:m-0 hover:text-white' key={key}>
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

export default DTC