import React from 'react'
import Button from '../Common/Button/Button'

const Partners = () => {
    return (
        <>
            <div className='sm:w-[90%] md:w-[90%] lg:w-[90%] w-[90%] m-auto'>
                <div className='sm:grid sm:grid-cols-[60%,40%] block sm:my-10 my-0'>
                    <div className='sm:pt-20 pt-0'>
                        <div className='sm:pt-20 pt-10'>
                            <h1 className='sm:text-[50px] text-4xl font-semibold'>8x8 Elevate Partner Program</h1>
                        </div>
                        <div className='mt-5 sm:text-2xl text-lg sm:w-[80%] w-[100%]'>
                            Our partner program offers two options: Agency and Reseller. Grow your customer base, build new revenue streams, and increase profits in the model you choose.
                        </div>
                        <div className='py-2'>
                            <button type={'button'} className={'bg-red text-white sm:w-auto w-[100%] mt-6 sm:mt-4 sm:text-lg text-base px-6 font-semibold h-10 m-auto rounded-3xl'}>Become a partner</button>
                        </div>
                    </div>
                    <div>
                        <div className='sm:p-10 p-auto mt-5 sm:mt-0 flex justify-end'>
                            <img src='/partners/NewImage.png' className='sm:h-[360px] h-auto'></img>
                        </div>
                    </div>
                </div>
                <div className='sm:grid sm:grid-cols-[35%,65%] block my-10 pt-10'>
                    <div className='w-[90%] m-auto sm:m-auto sm:w-[100%]'>
                        <img src='/partners/NewImage2.png' className='sm:h-[310px] h-auto' ></img>
                    </div>
                    <div className='sm:p-14 p-1 sm:mt-0 mt-10'>
                        <div>
                            <h1 className='text-4xl font-semibold'>Joining 8x8{"'"}s partner program</h1>
                        </div>
                        <div className='sm:text-xl text-lg'>
                            <p className='mt-2'>Organizations of all sizes are moving to the cloud, and the opportunity for partners is bigger than ever. Seize the moment by partnering with 8x8.</p>
                            <p className='mt-5'>Your customers will benefit from a solution that is easy to implement, easy to manage, and right-sized for their business. You{"'"}ll benefit by growing your customer base, building new revenue streams, and increasing profits</p>
                        </div>
                    </div>
                </div>
                <div className='sm:grid sm:grid-cols-[65%,35%] flex flex-col-reverse my-10 pt-10'>
                    <div className='sm:py-14 py-10 sm:pr-14 pr-0'>
                        <div>
                            <h1 className='text-4xl font-semibold'>
                                Making the Elevate partner program work for you
                            </h1>
                        </div>
                        <div className='sm:text-xl text-lg'>
                            <p className='mt-2'>One of the biggest differentiators of 8x8 is the multiple routes to market we offer our partners. Agency or Reseller, the choice is yours.</p>
                            <p className='mt-5'>Regardless of the route you choose, you will be supported by a a team of channel managers, sales experts, technical leads, marketing resources, and so much more to help you win with 8x8.</p>
                        </div>
                    </div>
                    <div>
                        <img src='/partners/NewImage3.png' className='sm:h-[310px] h-auto'></img>
                    </div>
                </div>
                <div className='sm:grid sm:grid-cols-[40%,60%] block my-10 sm:pt-10 pt-3'>
                    <div>
                        <div className='sm:ml-16 ml-0'>
                            <img src='/partners/NewImage4.png' className='sm:h-[100px] h-auto sm:w-[420px] w-auto'></img>
                        </div>
                    </div>
                    <div className='sm:px-14 px-0 mt-10 sm:mt-0'>
                        <div>
                            <h1 className='text-4xl font-semibold'>Benefits for all Elevate partners</h1>
                        </div>
                        <div className='sm:text-xl text-lg sm:p-5 p-0'>
                            <ul className="list-disc p-5 sm:p-0" >
                                <li >No-cost certifications</li>
                                <li>Industry-leading sales incentives</li>
                                <li>Sales collaboration—we will win business together </li>
                                <li>Support from the best channel team in the business</li>
                                <li>Marketing campaigns and pipeline-generating events</li>
                                <li>Dedicated engineering, deployment, and customer support teams</li>
                                <li>And so much more!</li>
                            </ul>
                            <div className='sm:py-5 py-8'>
                                <button type='button' className='w-[100%] sm:w-auto px-5 sm:text-xl text-lg h-10 font-semibold border border-red rounded-3xl text-red'>Became an 8*8 Partner</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='sm:grid sm:grid-cols-[65%,35%] flex flex-col-reverse'>
                    <div className='text-xl sm:py-5 py-8 sm:pr-5 pr-0'>
                        <div>
                            <h1 className='text-4xl font-semibold'>8x8 Elevate rewards top partners</h1>
                        </div>
                        <div className='sm:text-xl text-lg sm:w-[90%] w-[100%]'>
                            <p className='mt-2'>The partners that tier in the Elevate program are the best of the best. They train, they prepare, and they move mountains for their clients.</p>
                            <p className='mt-5'>Our program rewards these partners with exclusive incentives, experiences and executive insights that scale as they climb the Elevate program tiers: Peak, Apex and Summit.</p>
                        </div>
                    </div>
                    <div className='flex justify-end'>
                        <img src='/partners/NewImage5.png' className='sm:h-[320px] h-auto'></img>
                    </div>
                </div>
            </div>
            <div className='bg-black text-white py-10 w-[100%] my-10 flex justify-center'>
                <div className='text-center'>
                    <p className='text-3xl font-semibold my-5'>Our partnership</p>
                    <p className='my-5 text-lg'>Experience our award-winning partner service for yourself.</p>
                    <button type={'button'} className={'bg-red text-white sm:w-auto w-[100%] text-lg px-6 font-semibold h-10 m-auto rounded-3xl'}>Become an 8*8 partner</button>
                </div>
            </div>
        </>
    )
}

export default Partners