'use client'
import React, { useState } from 'react'
import Container from '../../components/Container/Container'
import Button from '../../components/Common/Button/Button'
import { Input } from '../../components/Common/Input/Input'
import Link from 'next/link'
import { forgotPassword } from '@/app/API/pages/Forgot-password'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import { successMessage } from '@/app/components/Messages/Messages'
import { ToastContainer } from 'react-toastify'
import LoginFooter from '@/app/components/Layout/LoginFooter'
import LoginNav from '@/app/components/Layout/LoginNav'

const Page = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  function validator() {
    const pattern = /^[\w\.-]+(\+\w+)?@[\w\.-]+\.\w+$/;
    return pattern.test(email);
  }

  const handleForgotPassword = () => {
    if (validator()) {

      forgotPassword({ email: email })
        .then((res) => {

          // successMessage("Please check your email for reset instructions")
          router.push(`/forgot-password/recovery?email=${email}`)
        })
        .catch(() => {
          setError('Something went wrong, please try again')
        })

    } else {
      setError('Please enter a valid email address')
    }
  }

  const handleInputValue = (e) => {
    setEmail(e.target.value)
    setError('')
  }

  return (
    <>
    <LoginNav />
    <Container>
      <div className='w-full sm:w-[40%] md:w-[70%] lg:w-[40%] mx-auto text-center sm:mt-14'>
        <h1 className='text-center text-2xl tracking-wide sm:text-3xl md:text-4xl lg:text-5xl my-2 font-bold text-heading'>Reset password</h1>

        <form>
          <label className="block my-5" htmlFor='email'>
            <span className="block text-start text-sm font-normal text-heading">Email Address</span>
            <Input type={"email"} placeholder={"name@company.com"} className={`w-full border mx-auto  sm:text-sm mt-4 ${error ? 'border border-red' : ''}`} value={email} id={"email"} onChange={handleInputValue} />
          </label>
          <p className="text-red-500 text-sm text-center text-red">{error}</p>
          <Button
            className="flex w-full mx-auto mt-4 sm:mt-6 justify-center px-4 py-2 text-white hover:border hover:bg-white hover:text-black bg-black border border-gray-300 rounded-md shadow-sm"
            disabled={false}
            onClick={handleForgotPassword}
          > Send Reset Instructions</Button>
        </form>
      </div>
      <ToastContainer />
    </Container>
   <LoginFooter/>
    </>
  )
}

export default Page