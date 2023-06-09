'use client'
import Image from 'next/image'
import React from 'react'
import Card from '../Common/Card/Card'
import List from './components/List'
import { Bars4Icon,XMarkIcon  } from "@heroicons/react/24/outline";
import Accordian from '../Accordian/Accordian'
import { useState } from 'react'
const Nav = () => {
    const [show, setShow] = useState(false)
    return (
        <nav className="sticky top-0 start-0 z-40 w-full  shadow-xl bg-heading border-gray-200 dark:bg-gray-900">
            <div className="relative flex flex-row items-center p-6	">
                <div className='relative w-28 h-8 mr-24'>
                    <Image fill={"true"} className='bg-contain mx-auto w-full' alt="logo.png" src={'/logo.png'} />
                </div>
                <ul className='hidden relative md:flex text-white gap-8 flex-row'>
                    <li className='group relative cursor-pointer'>Products
                        <Card className={'animate-fadeIn w-[800px] hidden group-hover:block absolute bg-white'}>
                            <List className={'grid grid-cols-2 gap-8'} />
                        </Card>
                    </li>
                    <li className='group relative cursor-pointer'>Solutions
                        <Card className={'animate-fadeIn w-[800px] hidden group-hover:block absolute bg-white'}>
                            <List className={'grid grid-cols-2 gap-8'} />
                        </Card>
                    </li>
                    <li className='group relative cursor-pointer'>Pricing
                        <Card className={'animate-fadeIn w-[800px] hidden group-hover:block absolute bg-white'}>
                            <List className={'grid grid-cols-2 gap-8'} />
                        </Card>
                    </li>
                </ul>
                <div className='hidden md:flex flex-row gap-10 items-center ml-auto'>
                    <p className='text-white'>Sign In</p>
                    <button
                        type="button"
                        className="inline-block  bg-white px-6 pb-2 pt-2.5 text-xs rounded-2xl font-medium uppercase leading-normal text-heading shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 border ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-white focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] ">
                        Get Started
                    </button>
                </div>
                <div className='flex md:hidden flex-row relative ml-auto cursor-pointer'>
                    {show === false ?
                        <Bars4Icon className="animate-fadeIn h-8 w-8 text-white" onClick={(e)=>{setShow(true)}}/>
                        : <XMarkIcon  className="animate-fadeIn h-8 w-8 text-white" onClick={(e)=>{setShow(false)}}/>}
                </div>
            </div>
            {show === true && (
                <div className='block md:hidden lg:hidden sm:hidden'>
                    <Accordian />
                </div>
            )}
        </nav>

    )
}

export default Nav