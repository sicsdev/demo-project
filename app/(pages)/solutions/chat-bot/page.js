import React from 'react'
import AboveFold from '@/app/components/ChatBots/AboveFold'
import Alert from '@/app/components/ChatBots/Alert'
import Requestdemo from '@/app/components/ChatBots/Requestdemo'
import Testimonial from '@/app/components/Testimonial/Testimonial'
const page = () => {
  return (
    <div>
        <AboveFold/>
        <Alert/>
        <Testimonial />
        {/* <Requestdemo/> */}
    </div>
  )
}

export default page