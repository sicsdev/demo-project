'use client'
import React from 'react'
import Container from '../../components/Container/Container'
import { Input } from '../../components/Common/Input/Input'
import Logos from '../../components/Checkout/Logos'
import Button from '../../components/Common/Button/Button'
import Card from '../../components/Common/Card/Card'
import Image from 'next/image'

const Checkout = () => {
    return (
        <Container>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8'>
                <div>
                    <h1 className='text-start text-2xl tracking-wide sm:text-3xl md:text-3xl lg:text-3xl my-4 font-bold text-heading'>Checkout</h1>
                    <h3 className='text-start text-xl tracking-wide sm:text-2xl md:text-2xl lg:text-2xl my-4 font-bold text-heading '>1. Enter Your Info</h3>
                    <div className='border bg-white rounded-lg border-border'>
                        <div className='flex justify-start gap-4 items-center  pl-5 p-1'>
                            <span className="text-start text-sm font-normal w-[20%] text-border">Work Email</span>
                            <input type={"email"} placeholder={"Email"} className={"p-4 w-full  focus:outline-none focus:border-0 focus:ring-0   invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-0 focus:invalid:ring-0 "} id={"email"} />
                        </div>
                        <div className='flex justify-start gap-4 items-center  pl-5 p-1 border border-l-0 border-r-0 border-border'>
                            <span className="text-start text-sm font-normal w-[20%] text-border">Cell Phone</span>
                            <input type={"number"} placeholder={"Cell Phone"} className={"p-4 w-full  focus:outline-none focus:border-0 focus:ring-0   invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-0 focus:invalid:ring-0 "} id={"mobile"} />
                        </div>
                        <div className='flex justify-start gap-4 items-center pl-5 p-1'>
                            <span className="text-start text-sm font-normal w-[20%] text-border">Full Name</span>
                            <input type={"text"} placeholder={"Enter your full name"} className={"p-4 w-full  focus:outline-none focus:border-0 focus:ring-0   invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-0 focus:invalid:ring-0 "} id={"name"} />
                        </div>
                    </div>
                    <div className="flex items-center my-6">
                        <input id="link-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked onChange={() => { console.log("") }} />
                        <label htmlFor="link-checkbox" className="ml-2 text-sm font-medium text-border ">I agree with the <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">terms and conditions</a>.</label>
                    </div>
                    <h3 className='text-start text-xl tracking-wide sm:text-2xl md:text-2xl lg:text-2xl my-4 font-bold text-heading '>2. Select Payment Method</h3>
                    <div className='border border-border rounded-lg p-4 bg-white'>
                        <div className='flex items-center justify-between'>
                            <div className="payment-element-child"><h3 className='text-sm text-black'>Credit or Debit Card</h3><p className="text-sm text-black mt-1">HSA / FSA accepted</p></div>
                            <Logos />
                        </div>
                        <div className='flex justify-start gap-4 items-center  pl-5 p-1 border border-border rounded-lg my-4'>
                            <input type={"text"} placeholder={"Card Number"} className={"p-1 sm:p-4 md:p-4 lg:p-4 w-[50%] sm:w-[60%] md:w-[60%] lg:w-[60%]  focus:outline-none focus:border-0 focus:ring-0   invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-0 focus:invalid:ring-0 "} id={"card"} />
                            <input type={"text"} placeholder={"MM/YY"} className={"p-1 sm:p-4 md:p-4 lg:p-4 w-[30%] sm:w-[20%] md:w-[20%] lg:w-[20%]  focus:outline-none focus:border-0 focus:ring-0   invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-0 focus:invalid:ring-0 "} id={"exp"} />
                            <input type={"text"} placeholder={"CVV"} className={"p-1 sm:p-4 md:p-4 lg:p-4  w-[30%] sm:w-[20%] md:w-[20%] lg:w-[20%]  focus:outline-none focus:border-0 focus:ring-0   invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-0 focus:invalid:ring-0 "} id={"cvv"} />
                        </div>
                        <Button className="flex w-full mx-auto mt-4 justify-center px-4 py-2 text-white hover:border hover:bg-white hover:text-black bg-black border border-gray-300 rounded-md shadow-sm" disabled={false}>Checkout</Button>
                    </div>
                </div>

                <div>
                    <div className="relative overflow-x-auto sm:p-8 md:p-8 lg:p-8 bg-sky2 my-8 rounded-lg bg-table_bg border border-border" >
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 bg-soft-blue">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-base rounded-l-lg">
                                        Product name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-base rounded-r-lg">
                                        Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-table_bg dark:bg-gray-800">
                                    <th scope="row" className="px-6 py-4 font-lg text-base text-gray-900 whitespace-nowrap dark:text-white">
                                        Guru 7 days free
                                    </th>
                                    <td className="px-6 py-4 text-base">
                                        Free Trial
                                    </td>
                                </tr>

                            </tbody>
                            <tfoot>
                                <tr className="text-base text-gray-900 dark:text-white">
                                    <th scope="row" className="px-6 py-3 text-base">Total</th>
                                    <td className="px-6 py-3">$0</td>
                                </tr>
                            </tfoot>
                        </table>
                        <div className='p-4 sm:p-8 md:p-8 lg:p-8'>
                        <Card className={'border border-border my-10'}>
                        <h1 className='my-2 text-lg text-heading'>Lorem ipsum dolor sit amet</h1>
                            <p className='my-2 text-sm text-heading'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                            <div className='flex justify-start gap-4 items-center'>
                                <div className='relative w-[80px] h-[80px]'>
                                    <Image fill={true} src={"https://static.intercomassets.com/avatars/4448521/square_128/4448521-1665142820.jpg"} className='bg-contain rounded-full mx-auto' alt='img'/>
                                </div>
                                <h1 className='my-2 text-heading text-lg font-semibold'>Lorem ipsum dolor sit amet</h1>
                            </div>
                        </Card>
                        <Card className={'border border-border my-10'}>
                            <h1 className='my-2 text-lg text-heading'>Lorem ipsum dolor sit amet</h1>
                            <p className='my-2 text-sm text-heading'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                            <div className='flex justify-start gap-4 items-center'>
                                <div className='relative w-[80px] h-[80px]'>
                                    <Image fill={true} src={"https://static.intercomassets.com/avatars/4448521/square_128/4448521-1665142820.jpg"} className='bg-contain rounded-full mx-auto' alt='img'/>
                                </div>
                                <h1 className='my-2 text-heading text-lg font-semibold'>Lorem ipsum dolor sit amet</h1>
                            </div>
                        </Card>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Checkout