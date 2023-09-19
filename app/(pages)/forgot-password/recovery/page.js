'use client'
import React, { useState } from 'react'
import Container from '../../../components/Container/Container'
import Button from '../../../components/Common/Button/Button'
import { Input } from '../../../components/Common/Input/Input'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { recoveryPassword } from '@/app/API/pages/Forgot-password'
import { successMessage } from '@/app/components/Messages/Messages'

const Page = () => {

  const params = useSearchParams()
  useEffect(() => {
    const emailQuery = params.get('email')
    if (emailQuery) { setForm({ ...form, email: emailQuery }) }
  }, [])
  
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    email: '',
    code: '',
    password: '',
    password_confirm: ''
  })

  const validateForm = () => {
    const { email, password, password_confirm } = form;
    const validEmail = /^[\w\.-]+(\+\w+)?@[\w\.-]+\.\w+$/.test(email);
    const validCode = form.code.length > 5
    !validCode && setError('Please enter a valid code, must be at least 6 characters');
    !validEmail && setError('Please enter a valid email address');
    const passwordsMatch = form.password && form.password_confirm && password === password_confirm
    !passwordsMatch && setError(<>Please enter a valid password: <br/> 6 characters minimum. <br/> Passwords must match.</>);
    return validEmail && passwordsMatch && validCode
  };

  const handleSubmitRecovery = () => {
    console.log(form)

    if (!validateForm()) return;
    recoveryPassword(form)
      .then((res) => {
        // successMessage("Password reset successfully")
        router.push(`/login`)
      })
      .catch(() => {
        setError('Something went wrong, please try again')
      })

  }

  const handleInputsValue = (e) => {
    setError('')
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  return (
    <Container>
      <div className='w-full sm:w-[40%] md:w-[70%] lg:w-[40%] mx-auto text-center'>
        <h1 className='text-center tracking-wide sm:text-3xl md:text-4xl lg:text-3xl my-2 font-bold text-heading'>Reset your password</h1>
        <p className='text-center text-sm text-voilet font-normal'>Enter the code you received in <b>{form.email}</b></p>
        <form>
          <label className="block my-5" htmlFor='code'>
            <span className="block text-start text-sm font-normal text-heading">Code</span>
            <Input value={form.code} type={""} placeholder={"Enter the code received by email"} className={`w-full border mx-auto mt-4`} id={"code"} onChange={handleInputsValue} />
          </label>

          <label className="block my-5" htmlFor='password'>
            <span className="block text-start text-sm font-normal text-heading">New password</span>
            <Input value={form.password} type={"password"} placeholder={""} className={`w-full border mx-auto mt-4`} id={"password"} onChange={handleInputsValue} />
          </label>

          <label className="block my-5" htmlFor='password_confirm'>
            <span className="block text-start text-sm font-normal text-heading">Confirm your password</span>
            <Input value={form.password_confirm} type={"password"} placeholder={""} className={`w-full border mx-auto mt-4`} id={"password_confirm"} onChange={handleInputsValue} />
          </label>

          <span className="block text-center text-sm text-red font-normal text-heading">{error}</span>

          <Button
            className="flex w-full mx-auto mt-4 justify-center px-4 py-2 text-white hover:border hover:bg-white hover:text-black bg-black border border-gray-300 rounded-md shadow-sm"
            disabled={false}
            onClick={handleSubmitRecovery}
          > Submit</Button>
        </form>
      </div>
    </Container>
  )
}

export default Page