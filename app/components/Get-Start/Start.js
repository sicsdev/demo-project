import React from 'react'
import Demo from '../Demo/Demo'

const Start = () => {
    const list = [
        "* Bolster inbound and outbound sales",
        "* Streamline your customer service ",
        "* Solve inventory, shipping, returns",
        "* Retarget your cart abandoners",
        "* Upsell and reactivate customers",
    ]
    return (
        <div className='bg-background'>
            <div className=' mx-auto max-w-[90%] sm:max-w-[80%] md:max-w-[80%] lg:max-w-[80%]  py-10'>
                <div className='block sm:flex md:flex lg:flex justify-evenly items-center'>
                    <div className=''>
                        <h1 className="font-bold  text-2xl tracking-tight bg-gradient-to-r from-voilet via-yellow to-white inline-block text-transparent bg-clip-text md:text-5xl lg:text-5xl sm:text-5xl">
                            Never think about customer service again
                        </h1>
                        <ul className='list-none my-8'>
                            {list.map((element, key) =>
                                <li key={key} className='my-4 tracking-normal'>
                                    <span className='flex gap-3  text-white  text-base align-bottom font-semibold'> {element}</span>
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