'use client'
import React, { useEffect, useState } from 'react'
import Container from '../../components/Container/Container'
import { Input } from '../../components/Common/Input/Input'
import Logos from '../../components/Checkout/Logos'
import Button from '../../components/Common/Button/Button'
import Card from '../../components/Common/Card/Card'
import Image from 'next/image'
import CheckOutForm from '@/app/components/Checkout/CheckOutForm'

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js";
import { useRouter, useSearchParams } from 'next/navigation'

const stripe_api = 'pk_test_51NC19PGMZM61eRRVpg4gaTiEaXZcPjougGklYq3nBN3tT7Ulmkbu2MNV6e86l6Yf8re51wVMdSEZ8dyAQ3ZR7Q4i00vjeqlGWW'
const stripeLib = loadStripe(stripe_api);

const Checkout = () => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const [planQuery, setPlanQuery] = useState('')
    const [showSummary, setShowSummary] = useState(false)

    useEffect(() => {
        searchParams.get('plan') ? setPlanQuery(searchParams.get('plan')) : setPlanQuery('')
        searchParams.get('email') ? setCheckoutForm({ ...checkoutForm, email: searchParams.get('email') }) : setCheckoutForm({ ...checkoutForm, email: '' })
    }, [])

    const [checkoutForm, setCheckoutForm] = useState({ phone_prefix: "+1" }) // phone_prefix: "+1" Hardcoded for testing, need to add to the form later
    const [userformErrors, setUserformErrors] = useState([])

    const handleFormValues = (e) => {
        setCheckoutForm({
            ...checkoutForm,
            [e.target.name]: e.target.value
        })
    }

    function validateForm() {
        setUserformErrors([])
        let email = checkoutForm.email;
        let password = checkoutForm.password;
        let newErrors = []
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) { newErrors.push('Please enter a valid email address') }
        if (password.length < 6) { newErrors.push('Password must be at least 6 characters') }
        setUserformErrors([...newErrors])
    }

    const toggleClass = () => {
        setShowSummary(!showSummary)
    }

    return (
        <Container>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 '>

                <div className="text-center lg:hidden">
                    <div
                        className="rounded text-center"
                        onClick={toggleClass}
                        style={{ position: "relative", cursor: "pointer" }}
                    >
                        {showSummary ? (
                            <>
                                <hr className='opacity-10 my-1'></hr>
                                <div className='text-center flex'>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                        </svg>
                                    </div>
                                    <div >
                                        <span className='text-right mx-3'> Hide Order Summary</span>
                                    </div>
                                </div>
                                <hr className='opacity-10 my-1'></hr>
                                <div className='border rounded-lg border-border'>
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" >
                                        <tbody>
                                            <tr className="dark:bg-gray-800">
                                                <th scope="row" className="px-6 py-4 font-lg text-base text-gray-900 whitespace-nowrap text-black">
                                                    {planQuery == 1 && "Pro Plan"}
                                                    {planQuery == 0 && "Standard Plan"}
                                                </th>
                                                <td className="px-6 py-4 text-base">
                                                    Free Trial
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr className=" text-gray-900 text-black text-black">
                                                <th className="px-6 py-3 text-base">Total</th>
                                                <td className="px-6 py-3">$0</td>
                                            </tr>
                                        </tfoot>

                                    </table>
                                </div>
                            </>
                        ) : (
                            <>
                                <hr className='opacity-10 my-1'></hr>
                                <div className='flex'>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                        </svg>
                                    </div>
                                    <div >
                                        <span className='text-right mx-3'>Show Order Summary</span>
                                    </div>
                                    <div className='text-right'>
                                        $0
                                    </div>
                                </div>
                                <hr className='opacity-10 my-1'></hr>
                            </>
                        )}
                    </div>
                </div>
                <div>
                    <h1 className='text-start text-2xl tracking-wide sm:text-3xl md:text-3xl lg:text-3xl my-4 font-bold text-heading'>Checkout</h1>
                    <h3 className='text-start text-xl tracking-wide sm:text-2xl md:text-2xl lg:text-2xl my-4 font-bold text-heading '>1. Enter Your Info</h3>
                    <div className='border bg-white rounded-lg border-border'>
                        <div className='flex justify-start gap-4 items-center  pl-5 p-1'>
                            <span className="text-start text-sm font-normal w-[20%] text-border">Work Email</span>
                            <input type={"email"} placeholder={"Email"} className={"p-4 w-full  focus:outline-none focus:border-0 focus:ring-0   invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-0 focus:invalid:ring-0 "} name='email' id={"email"} onChange={handleFormValues} value={checkoutForm.email} />
                        </div>
                        <div className='flex justify-start gap-4 items-center border  border-l-0 border-r-0  border-b-0  border-top-1 border-border pl-5 p-1'>
                            <span className="text-start text-sm font-normal w-[20%] text-border">Full Name</span>
                            <input type={"text"} placeholder={"Enter your full name"} className={"p-4 w-full  focus:outline-none focus:border-0 focus:ring-0   invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-0 focus:invalid:ring-0 "} name='name' id={"name"} onChange={handleFormValues} />
                        </div>
                        <div className='flex justify-start gap-4 items-center  pl-5 p-1 border border-l-0 border-r-0 border-border'>
                            <span className="text-start text-sm font-normal w-[20%] text-border">Cell Phone</span>
                            <input type={"number"} placeholder={"Cell Phone"} className={"p-4 w-full  focus:outline-none focus:border-0 focus:ring-0   invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-0 focus:invalid:ring-0 "} name='phone' id={"mobile"} onChange={handleFormValues} />
                        </div>
                        <div className='flex justify-start gap-4 items-center  pl-5 p-1 border border-t-0   border-b-0  border-l-0 border-r-0 border-border'>
                            <span className="text-start text-sm font-normal w-[20%] text-border">Password</span>
                            <input type={"password"} placeholder={"Password"} className={"p-4 w-full  focus:outline-none focus:border-0 focus:ring-0   invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-0 focus:invalid:ring-0 "} name='password' id={"password"} onChange={handleFormValues} />
                        </div>
                    </div>
                    <div className="flex items-center my-6">
                        <input id="link-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked onChange={() => { console.log("") }} />
                        <label htmlFor="link-checkbox" className="ml-2 text-sm font-medium text-border ">I agree with the <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">terms and conditions</a>.</label>
                    </div>
                    <div className="flex justify-center flex flex-col">
                        {userformErrors && userformErrors.map((error, index) => {
                            return <div key={index}><p className="text-red-500 text-sm">&#9888; {error}</p></div>
                        })}
                    </div>

                    <h3 className='text-start text-xl tracking-wide sm:text-2xl md:text-2xl lg:text-2xl my-4 font-bold text-heading '>2. Select Payment Method</h3>
                    <div className='border border-border rounded-lg p-4 bg-white'>
                        <div className='flex items-center justify-between'>
                            <div className="payment-element-child"><h3 className='text-sm text-black'>Credit or Debit Card</h3><p className="text-sm text-black mt-1"></p></div>
                            <Logos />
                        </div>
                        <div className='my-3 p-3'>
                            <Elements stripe={stripeLib}>
                                <CheckOutForm checkoutForm={checkoutForm} validateForm={validateForm} />
                            </Elements>
                        </div>
                    </div>
                </div>

                <div className="hidden md:block">
                    <div className="relative overflow-x-auto sm:p-8 md:p-8 lg:p-8 bg-sky2 my-8 rounded-lg bg-sky border border-border" >
                        <Card className={'border bg-white border-border '}>
                            <h5>Order Summary</h5>
                            <hr className='opacity-10 my-1'></hr>
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg">
                                <tbody>
                                    <tr className="dark:bg-gray-800 bg-white">
                                        <th scope="row" className="px-6 py-4 font-lg text-base text-gray-900 whitespace-nowrap text-black">
                                            {planQuery == 1 && "Pro Plan"}
                                            {planQuery == 0 && "Standard Plan"}
                                        </th>
                                        <td className="px-6 py-4 text-base">
                                            Free Trial
                                        </td>
                                    </tr>

                                </tbody>
                                <tfoot>
                                    <tr className="text-base text-gray-900 bg-white text-black text-black">
                                        <th scope="row" className="px-6 py-3 text-base">Total</th>
                                        <td className="px-6 py-3">$0</td>
                                    </tr>
                                </tfoot>

                            </table>

                        </Card>

                        <div className='p-4 sm:p-8 md:p-8 lg:p-8'>
                            <Card className={'border bg-white border-border my-10'}>
                                <h1 className='my-2 text-lg text-heading'>Customer service headaches are history.</h1>
                                <p className='my-2 text-sm text-heading'>Customer service is a solved problem. Automating support for our enterprise clients has been an immense cost-saver and has provided us with an industry-leading advantage.
                                </p>
                                <div className='flex justify-start gap-4 items-center'>
                                    <div className='relative w-[80px] h-[80px]'>
                                        <Image fill={true} src={"/images/checkout-testimonial-1.png"} className='bg-contain rounded-full mx-auto' alt='img' />
                                    </div>
                                    <h1 className='my-2 text-heading text-lg font-semibold'>Dean Zimberg, Perry</h1>
                                </div>
                            </Card>
                            <Card className={'border bg-white border-border my-10'}>
                                <h1 className='my-2 text-lg text-heading'>We supercharged our business with Tempo.</h1>
                                <p className='my-2 text-sm text-heading'>The ability to scale up customer-facing staffing and back office operations, coupled with Tempo's ChatGPT-powered automations, has really powered our business's fulfillment.</p>
                                <div className='flex justify-start gap-4 items-center'>
                                    <div className='relative w-[80px] h-[80px]'>
                                        <Image fill={true} src={"/images/checkout-testimonial-2.png"} className='bg-contain rounded-full mx-auto' alt='img' />
                                    </div>
                                    <h1 className='my-2 text-heading text-lg font-semibold'>Frank Patrick, LabPass</h1>
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