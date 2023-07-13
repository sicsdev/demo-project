import React from 'react'
import Button from '../../Common/Button/Button'
import { logos } from '../../Forms/ReadOnly/logos_data'

const WorkFlowTemplates = () => {
    return (
        <>
            <h3 className='text-heading text-center font-semibold text-xl my-2'>What do you want to build today?</h3>
            <p className='text-heading text-sm text-center'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam</p>
            <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-2 my-4'>
                {logos.map((ele,key)=>
                <div className='border border-border rounded-lg p-3' key={key}>
                    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-border rounded-lg ">
                        <span className="font-medium text-white">DN</span>
                    </div>
                    <h3 className='text-heading  font-semibold text-sm my-1'>The standard Lorem Ipsum passage, used since the 1500s
                    </h3>
                    <p className='text-heading text-[13px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <Button
                        type={"submit"}
                        className="inline-block rounded my-2 bg-white border border-border px-5 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 focus:bg-success-600 focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"

                    >
                        Set Up
                    </Button>
                </div>
                )}
                {logos.map((ele,key)=>
                <div className='border border-border rounded-lg p-3' key={key}>
                    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-border rounded-lg ">
                        <span className="font-medium text-white">DN</span>
                    </div>
                    <h3 className='text-heading  font-semibold text-sm my-1'>The standard Lorem Ipsum passage, used since the 1500s
                    </h3>
                    <p className='text-heading text-[13px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <Button
                        type={"submit"}
                        className="inline-block rounded my-2 bg-white border border-border px-5 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 focus:bg-success-600 focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"

                    >
                        Set Up
                    </Button>
                </div>
                )}
            </div>
        </>
    )
}

export default WorkFlowTemplates