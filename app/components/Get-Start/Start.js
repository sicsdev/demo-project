import React from 'react'
import { Input } from '../Common/Input/Input'
import Select from '../Common/Select/Select'
import Card from '../Common/Card/Card'
import WarningBtn from '../Common/Button/Button'
import Button from '../Common/Button/Button'

const Start = () => {
    const list = [
        "Get hyper-accurate attribution for your Ecommerce store",
        "Prove ROI and significantly reduce customer aquisition costs",
        "Gain instant visibility on your ad campaign performance",
        "Reveal insights into every customer journey and buying intent",
        "Feed the ad platforms AI for better ad optimization",
        "Analyze accurate data to make better optimization decisions",
    ]
    const drop_data = ["$0 - $5k", "$5k - $25k", "$25k - $100k", "$100k - $500k", "$500+"]
    return (
        <div className='bg-background'>
            <div className='justify-between mx-auto max-w-[90%] sm:max-w-[80%] md:max-w-[80%] lg:max-w-[80%]  pt-10'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2'>
                    <div className='md:px-8 lg:px-8 sm:px-8 py-8  sm:py-12 md:py-12 lg:py-12'>
                        <h1 className="mb-4  font-semibold  text-xl  leading-none tracking-tight bg-gradient-to-r from-voilet via-yellow to-white inline-block text-transparent bg-clip-text md:text-5xl lg:text-5xl sm:text-5xl">
                            Attribute purchases back to the correct ads
                        </h1>
                        <ul className='list-none my-8'>
                            {list.map((element, key) =>
                                <li key={key} className='my-4 tracking-normal'>
                                    <span className='flex gap-3  text-white  text-base align-bottom font-semibold'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                        </svg> {element}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className='md:px-8 lg:px-8 sm:px-8  pb-8 sm:py-16 md:py-16 lg:py-16'>
                        <Card>
                            <h1 className='text-xl sm:2xl md:2xl lg:2xl font-semibold text-heading mb-4'>Ready for accurate attribution?</h1>
                            <form>
                                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 '>
                                    <div className='col-span-1'>
                                        <label className="block">
                                            <span className="block text-sm font-semibold text-slate-700">First Name</span>
                                            <Input type={"text"} placeholder={"Enter your first name"} id={"first_name"} onChange={(value) => { console.log(value) }} />
                                        </label>
                                    </div>
                                    <div className='col-span-1'>
                                        <label className="block">
                                            <span className="block text-sm font-semibold text-slate-700">Last Name</span>
                                            <Input type={"text"} placeholder={"Enter your last name"} id={"last_name"} onChange={(value) => { console.log(value) }} />
                                        </label>
                                    </div>
                                </div>
                                <div className='mt-8'>
                                    <label className="block">
                                        <span className="block text-xs font-medium text-slate-700">Work Email</span>
                                        <Input type={"email"} placeholder={"Enter your email"} id={"email"} onChange={(value) => { console.log(value) }} />
                                    </label>
                                </div>
                                <div className='mt-8'>
                                    <label className="block">
                                        <span className="block text-xs font-medium text-slate-700">Monthly Ad Spend</span>
                                        <span className="block text-xs font-light text-slate-700 my-2">How much money does your business spend on digital ads each month?</span>
                                        <Select value={''} placeholder={"select"} data={drop_data} onChange={(value) => { console.log(value) }} />
                                    </label>
                                </div>
                                <Button
                                    type={'submit'}
                                    className={'mt-4 w-full focus:ring-yellow-300 text-white bg-btn_y_main hover:bg-btn_y_hover dark:focus:ring-yellow-900'}
                                    >
                                    Save Changes
                                </Button>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Start