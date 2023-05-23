import React from 'react'
import { Input } from '../Common/Input/Input'
import Button from '../Common/Button/Button'

const Demo = () => {
    return (
        <div className="mx-auto max-w-[90%] my-12">
            <div className='max-w-[100%] mx-auto sm:max-w-[80%] md:max-w-[80%] lg:max-w-[80%] bg-slate-light px-4 py-4 sm:px-36 md:px-36 lg:px-36 sm:py-24 md:py-24 lg:py-24'>
                <div className='sm:max-w-[650px] md:max-w-[650px] lg:max-w-[650px] mx-auto'>
                    <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl my-2 font-bold text-heading'>Join the <span className='text-voilet'>11,907+ brands</span> that use Gorgias every day</h1>
                    <form className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-1 mt-8'>
                        <div className='inline col-span-2 '>
                            <Input type={"email"} placeholder={"Enter your email"} id={"email"} onChange={(value) => { console.log(value) }} />
                        </div>
                        <div className='inline mt-5 sm:m-0 md:m-0 lg:m-0'>
                            <Button
                                type={'submit'}
                                className={'px-3 py-[11px] w-full focus:ring-yellow-300 text-white bg-primary hover:bg-black dark:focus:ring-yellow-900'}
                            >
                                Start your Free Trial
                            </Button>
                        </div>

                    </form>
                </div>
            </div>

        </div >
    )
}

export default Demo