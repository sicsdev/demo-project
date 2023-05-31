'use client'
import React from 'react'
import Container from '../../components/Container/Container'
import Button from '../../components/Common/Button/Button'
import { Input } from '../../components/Common/Input/Input'
import Link from 'next/link'
const Page = () => {
  return (
    <Container>
    <div className='w-full sm:w-[40%] md:w-[70%] lg:w-[40%] mx-auto text-center'>
        <h1 className='text-center text-2xl tracking-wide sm:text-3xl md:text-4xl lg:text-5xl my-2 font-bold text-heading'>Reset password</h1>
      
        <form>
            <label className="block my-5" htmlFor='email'>
                <span className="block text-start text-sm font-normal text-heading">Email Address</span>
                <Input type={"email"} placeholder={"name@company.com"} className={"w-full border mx-auto mt-4"}   value={''} id={"email"} onChange={(value) => { console.log(value) }} />
            </label>
            <Link href="/login?password=true"> <Button className="flex w-full mx-auto mt-4 justify-center px-4 py-2 text-white hover:border hover:bg-white hover:text-black bg-black border border-gray-300 rounded-md shadow-sm" disabled={false}> Send Reset Instructions</Button></Link>
        </form>
    </div>
</Container>
  )
}

export default Page