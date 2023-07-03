'use client'
import React, { useState } from 'react'
import Desktop from '../../components/Checkout/Desktop'
import Mobile from '../../components/Checkout/Mobile'
import { useEffect } from 'react';
import Checkout from '../checkout/page';
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  router.push("/checkout");
  const [select, setSelect] = useState(0)
  let guru = ["3 users", "5000 tickets", "24/7 support", "No-code integration", "White-label branding", "Dedicated account manager"]
  let pro = ["1 user", "3000 tickets", "24/7 support", "No-code integration"]

  return (
    <>  
      {/* <Desktop pro={pro} guru={guru} setSelect={setSelect} select={select}/>
      <Mobile pro={pro} guru={guru} setSelect={setSelect} select={select} /> */}
      
    </>
  )
}

export default Page