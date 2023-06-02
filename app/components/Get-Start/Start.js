import React from 'react'
import Demo from '../Demo/Demo'

const Start = () => {
    const list = [
        "Eliminates refunds",
        "Automates shipping & returns",
        "Handles customer complaints",
        "Manages subscriptions & cancellations",
    ]
    return (
        <div className='bg-background'>
            <div className=' mx-auto max-w-[90%] sm:max-w-[80%] md:max-w-[80%] lg:max-w-[80%]  py-10'>
                <div className='block sm:flex md:flex lg:flex justify-evenly items-center gap-10'>
                    <div className=''>
                        <h1 className=" font-bold  text-2xl text-white  md:text-5xl lg:text-5xl sm:text-5xl">
                        <span className="text-first-section-color">
                            Never think </span>  about customer service again
                        </h1>
                        <ul className='list-none my-6 sm:my-6'>
                            {list.map((element, key) =>
                                <li key={key} className='my-2 sm:my-2 tracking-normal'>
                                    <span className='flex gap-3  text-custom-small  text-xl align-bottom font-semibold'> &#x2713; {element}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                    <Demo />
                </div>
            </div>
        </div>
    )
}

export default Start