"use client";

import React from 'react'
import Startkeyword from '@/app/components/Get-Start/Startkeyword';
import DTC from '@/app/components/DTC/DTC'
import Info from '@/app/components/Info-Screen/Info'
import Trial from '@/app/components/Trial/Trial'
import SecondBan from '@/app/components/Layout/SecondBan'
import Benifits from '@/app/components/Benifits/Benifits'
import Brandpercentage from '@/app/components/Brandpercentage/Brandpercentage'
import Social from '@/app/components/Social/Social'
import Testimonial from '@/app/components/Testimonial/Testimonial'
import Newstandard from '@/app/components/Newstandardpage/Newstandard'
import Iconanimation from '@/app/components/Iconanimation/Iconanimation'
import Head from 'next/head'
import Launch from '@/app/components/Get-Start/Launch';
function Page() {
  return (
    <main className="scroll-smooth">
    <Head></Head>
    <Startkeyword />
    <DTC />
    <Info />
    <Trial />
    <SecondBan />
    <Launch />
    {/* <Benifits />     */}
    <Brandpercentage/>  {/* new */}
    <Social />
    <Testimonial />
    <Newstandard/>      {/* new */}
    {/* <Faq />   */}
    <Iconanimation/>
    </main>
  )
}

export default Page
