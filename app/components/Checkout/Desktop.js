import React from 'react'
import Container from '../Container/Container'
import Card from '../Common/Card/Card'
import Button from '../Common/Button/Button'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

const Desktop = ({ pro, guru, setSelect, select }) => {

    const router = useRouter()

    const searchParams = useSearchParams();
    const emailQuery = searchParams.get('email')

    const handleGetFreeTrial = () => {
        router.push(`/checkout?email=${emailQuery || ''}&plan=${select}`);
    }


    return (
        <div className='hidden sm:hidden md:hidden lg:block' style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=%271860%27 height=%271900%27 fill=%27none%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath d=%27M1063.43 12.6364c367.16 45.007 687.98 304.0646 794.88 679.0506 3.46 11.402-3.7 23.608-15.24 26.616l-57.69 15.041c120.54 462.306-157.08 934.396-619.51 1054.966l15.02 57.61c3.01 11.53-4.16 23.73-15.82 26.28-49.7 11.73-99.44 19.33-148.84 23-22.388 3.12-49.462 4.71-81.749 4.71-444.176 0-809.937-314.15-908.1237-729.65-.0771-.29-.1482-.58-.213-.88-10.7156-45.42-17.9662-90.87-21.9148-136.07C1.6958 1004.77.4023.3519.4023.3519H948.027c50.826 0 88.603 4.2072 115.403 12.2845z%27 fill=%27%23fff%27/%3E%3C/svg%3E")', backgroundColor: "#60a5fa", backgroundSize: "clamp(80%,50vw,160%) auto", backgroundRepeat: "no-repeat", backgroundPosition: "-20vw 40%" }}>
            <Container>
                <div className='flex gap-4 ' >
                    <div className=''>
                        <h1 className='text-center text-2xl tracking-wide sm:text-3xl md:text-4xl lg:text-4xl my-2 font-bold text-heading'>Choose your plan</h1>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 my-12'>
                            <Card className={'cursor-pointer hover:bg-card_bg border border-border'} onClick={() => { setSelect(0) }}>
                                <div>
                                    <div className="flex items-center mr-4">
                                        <input id="purple-radio" type="radio" value={select} name="colored-radio" className="w-4 h-4 text-voilet bg-voilet border-gray-300  dark:bg-voilet dark:border-gray-600" checked={select === 0} />
                                        <label htmlFor="purple-radio" className="ml-2 text-lg font-semibold text-gray-900 dark:text-gray-300">Standard</label>
                                    </div>
                                    <p className='text-slate font-normal text-sm my-4'>7 days free, then <span className='font-bold text-heading'>$449.99/</span>mo</p>
                                    <h3 className='font-bold text-heading my-6'> Plan includes:</h3>
                                    <ul>
                                        {pro.map((element, key) =>
                                            <li key={key} className='text-sm flex gap-3 items-center my-2'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="" className="w-5 h-5 text-voilet">
                                                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                            </svg>
                                                {element}</li>
                                        )}
                                    </ul>
                                </div>
                            </Card>
                            <Card className={'cursor-pointer hover:bg-card_bg border border-border'} onClick={() => { setSelect(1) }}>
                                <div>
                                    <div className="flex items-center mr-4">
                                        <input id="purple-radio" type="radio" value={select} name="colored-radio" className="w-4 h-4 text-voilet bg-voilet border-gray-300  dark:bg-voilet dark:border-gray-600" checked={select === 1} />
                                        <label htmlFor="purple-radio" className="ml-2 text-lg font-semibold text-gray-900 dark:text-gray-300">Pro</label>
                                    </div>
                                    <p className='text-slate font-normal text-sm my-4'>7 days free, then <span className='font-bold text-heading'>$599.99/</span>mo</p>
                                    <h3 className='font-bold text-heading my-6'>Plan includes:</h3>
                                    <ul>
                                        {guru.map((element, key) =>
                                            <li key={key} className='flex gap-3 my-2 items-center text-sm'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                            </svg>
                                                {element}</li>
                                        )}
                                    </ul>
                                </div>
                            </Card>
                        </div>

                        <Button className="flex w-full mx-auto mt-4 justify-center px-4 py-2 text-white hover:border hover:bg-white hover:text-black bg-black border border-gray-300 rounded-md shadow-sm" disabled={false} onClick={handleGetFreeTrial}>Get Free Trial</Button>
                        {/* <Link href={'/checkout'}><Button className="flex w-full mx-auto mt-4 justify-center px-4 py-2 text-black hover:border hover:bg-black hover:text-white bg-white border border-gray-300 rounded-md shadow-sm" disabled={false}>Skip Trial</Button></Link> */}

                    </div>
                    <div className='block text-center relative  w-[600px] sm-w-[600] mx-auto' >
                        <Image src="isometric-recolored2.svg" alt='img' fill={true} className='bg-contain mx-auto ' />

                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Desktop