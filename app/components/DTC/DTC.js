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
        <div className='bg-cyan-50 py-4 '>
        <div className='my-8  mx-auto max-w-[90%]'>
            <h1 className='text-center text-base sm:text-2xl md:text-2xl lg:text-2xl  my-2 font-base text-heading'>Trusted by top ecommerce and digital services brands</h1>
            <div className='block sm:flex md:flex lg:flex justify-evenly items-center text-center gap-40'>

                {images.map((element, key) =>
                    <div className='relative h-[70px] w-[120px] mx-auto sm:m-0 md:m-0 lg:m-0 hover:text-white ' key={key}>
                        <Image
                            src={element}
                            fill={true}
                            alt="Picture of the author"
                            className='m-auto object-contain img-div-1'
                        />
                    </div>
                )}
            </div>
        </div>
        </div>
    )
}

export default DTC