import React from 'react'
import Marquee from "react-fast-marquee";
import Image from 'next/image';
const Direction = () => {
    return (
        <div className='my-16 cursor-pointer mx-auto lg:max-w-[90%]'>
            <h1 className='my-4 text-center font-semibold  text-heading'>TRUSTED BY 60,000+ BUSINESSES</h1>
            <Marquee pauseOnHover={true} speed={30} gradientWidth={400} >
                <div className='mx-16 z-0'>
                    <Image
                        src="https://dam.freshworks.com/m/14020c7926e63d41/original/Decathlon-Logo.webp"
                        width={130}
                        height={200}
                        alt="Picture of the author"
                    />
                </div>
                <div className='mx-16'>
                    <Image
                        src="https://dam.freshworks.com/m/14020c7926e63d41/original/Decathlon-Logo.webp"
                        width={130}
                        height={200}
                        alt="Picture of the author"
                    />
                </div>
                <div className='mx-16'>
                    <Image
                        src="https://dam.freshworks.com/m/14020c7926e63d41/original/Decathlon-Logo.webp"
                        width={130}
                        height={200}
                        alt="Picture of the author"
                    />
                </div>
                <div className='mx-16'>
                    <Image
                        src="https://dam.freshworks.com/m/14020c7926e63d41/original/Decathlon-Logo.webp"
                        width={130}
                        height={200}
                        alt="Picture of the author"
                    />
                </div>
                <div className='mx-16'>
                    <Image
                        src="https://dam.freshworks.com/m/14020c7926e63d41/original/Decathlon-Logo.webp"
                        width={130}
                        height={200}
                        alt="Picture of the author"
                    />
                </div>
                <div className='mx-16'>
                    <Image
                        src="https://dam.freshworks.com/m/14020c7926e63d41/original/Decathlon-Logo.webp"
                        width={130}
                        height={200}
                        alt="Picture of the author"
                    />
                </div>
                <div className='mx-16'>
                    <Image
                        src="https://dam.freshworks.com/m/14020c7926e63d41/original/Decathlon-Logo.webp"
                        width={130}
                        height={200}
                        alt="Picture of the author"
                    />
                </div>
            </Marquee>
        </div>
    )
}

export default Direction