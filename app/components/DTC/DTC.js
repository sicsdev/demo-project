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
        <div className='bg-cyan-50 py-5'>
        <div className='my-8 cursor-pointer mx-auto max-w-[90%]'>
            <h1 className='text-center font-normal'>Trusted by top ecommerce and service brands</h1>
            <div className='block sm:flex md:flex lg:flex justify-evenly items-center text-center'>

                {images.map((element, key) =>
                    <div className='relative h-[100px] w-[120px] mx-auto sm:m-0 md:m-0 lg:m-0' key={key}>
                        <Image
                            src={element}
                            fill={true}
                            alt="Picture of the author"
                            className='m-auto object-contain'
                        />
                    </div>
                )}
            </div>
        </div>
        </div>
    )
}

export default DTC