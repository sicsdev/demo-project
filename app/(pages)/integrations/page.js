import { InegrtionAbove } from '@/app/components/Integration/InegrtionAbove'
import NewIntegration from '@/app/components/Integration/NewIntegration'
import Connect from '@/app/components/Product/Connect'
import React from 'react'

const page = () => {
  return (
    <div>
        <InegrtionAbove />
        <NewIntegration />
        <Connect />
    </div>
  )
}

export default page