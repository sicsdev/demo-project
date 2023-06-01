import React from 'react'
import Container from '../Container/Container'
import Card from '../Common/Card/Card'
import Button from '../Common/Button/Button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Mobile = ({ pro, guru, setSelect, select }) => {

    const router = useRouter()
    const handleGetFreeTrial = () => {
        localStorage.setItem('tempPlan', select);
        router.push(`/checkout`);
    }

    return (
        <div className='block  lg:hidden'>
            <Container>
                <h1 className='text-center text-2xl tracking-wide sm:text-3xl md:text-4xl lg:text-4xl my-2 font-bold text-heading'>Choose your trial plan</h1>
                <ul className=" text-sm font-medium text-center flex my-4">
                    <li className={`w-full border border-border ${select === 0 ?"bg-card_bg":"bg-white"}`} onClick={() => setSelect(0)}>
                        <a href="#" className="inline-block w-full p-4 text-gray-900 bg-gray-100 focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white" aria-current="page">Pro</a>
                    </li>
                    <li className={`w-full border border-border ${select === 1 ?"bg-card_bg":"bg-white"}`} onClick={() => setSelect(1)}>
                        <a href="#" className="inline-block w-full p-4  hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Guru</a>
                    </li>
                </ul>
                <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 my-12'>
                    {select === 0 && (

                        <Card className={`bg-card_bg border border-border mx-auto`}>
                            <div>
                                <div className="flex items-center mr-4">
                                    <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-gray-300">Standard</span>
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
                    )}
                    {select === 1 && (
                        <Card className={'bg-card_bg border border-border mx-auto'}>
                            <div>
                                <div className="flex items-center mr-4">
                                    <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-gray-300">Pro</span>
                                </div>
                                <p className='text-slate font-normal text-sm my-4'>7 days free, then <span className='font-bold text-heading'>$599.99/</span>mo</p>
                                <h3 className='font-bold text-heading my-6'> Plan includes:</h3>
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
                    )}
                </div>
               
                <Button className="flex w-full mx-auto mt-4 justify-center px-4 py-2 text-white hover:border hover:bg-white hover:text-black bg-black border border-gray-300 rounded-md shadow-sm" disabled={false} onClick={handleGetFreeTrial}>Get Free Trial</Button>
                {/* <Link href={'/checkout'}><Button className="flex w-full mx-auto mt-4 justify-center px-4 py-2 text-black hover:border hover:bg-black hover:text-white bg-white border border-gray-300 rounded-md shadow-sm" disabled={false}>Skip Trial</Button></Link> */}
            </Container>
        </div>
    )
}

export default Mobile