import React from 'react'
import Image from 'next/image';
const Industry = () => {
    return (
        <div>
            <h1 className='text-center text-3xl w-[100%] md:text-5xl md:w-[60%] m-auto my-8 font-semibold text-gray-600'>
                Recommended by leading industry experts
            </h1>
            <div className='flex  justify-evenly md:justify-between mx-auto lg:max-w-[80%]'>
                <Image
                    src="https://www.freshworks.com/_next/image/?url=https%3A%2F%2Fdam.freshworks.com%2Fm%2F584a891be1218abb%2Foriginal%2Fgartner-magicquadrant-220x240.webp&w=640&q=75"
                    width={180}
                    height={200}
                    alt="Picture of the author"
                />
                <Image
                    src="https://www.freshworks.com/_next/image/?url=https%3A%2F%2Fdam.freshworks.com%2Fm%2F5dcc22972ad34baa%2Foriginal%2FTrustradius.webp&w=640&q=75"
                    width={180}
                    height={200}
                    alt="Picture of the author"
                />
                <Image
                    src="https://www.freshworks.com/_next/image/?url=https%3A%2F%2Fdam.freshworks.com%2Fm%2F383f164ad0ce05f3%2Foriginal%2FCapterra-Shortlist-2022.webp&w=640&q=75"
                    width={180}
                    height={200}
                    alt="Picture of the author"
                />
                <Image
                    src="https://www.freshworks.com/_next/image/?url=https%3A%2F%2Fdam.freshworks.com%2Fm%2F7114324e3f2933a7%2Foriginal%2FG2-Best-software-award-2023.webp&w=640&q=75"
                    width={180}
                    height={200}
                    alt="Picture of the author"
                />
            </div>
        </div>
    )
}

export default Industry