'use client'
import React, { useState } from 'react'
import Desktop from '../../components/Checkout/Desktop'
import Mobile from '../../components/Checkout/Mobile'
import { useEffect } from 'react'

const Page = () => {
  let tempEmail = localStorage.getItem('tempEmail')
  const [select, setSelect] = useState(1)
  let guru = ["3 users", "5000 tickets", "24/7 support", "No-code integration", "White-label branding", "Dedicated account manager"]
  let pro = ["1 user", "3000 tickets", "24/7 support", "No-code integration"]

  return (
    <>
      <Desktop pro={pro} guru={guru} setSelect={setSelect} select={select} tempEmail={tempEmail} />
      <Mobile pro={pro} guru={guru} setSelect={setSelect} select={select} tempEmail={tempEmail} />
    </>
  )
}

export default Page