"use client"
import React, {useRef} from 'react';
import Securesteps from '@/app/components/Security/Securesteps';
import Certification from '@/app/components/Security/Certification';
import Reliability from '@/app/components/Security/Reliability';
import Secureform from '@/app/components/Security/Secureform';
import Banner from '../../components/Security/Banner';
import HomeComponent from '@/app/components/Home/HomeComponent';
import ProductForm from '@/app/components/Products/ProductForm';
import ContactComplaint from '@/app/components/Ip/Chatbot/Contact/ContactComplaint';
const page = () => {
    const ref = useRef(null);
    const handleClickScroll = () => {
      console.log("clicked");
      ref.current?.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <div className='bg-white'>
            <Banner handleClickScroll={handleClickScroll} />
            <div className="sm:mt-[75vh]">
                <Securesteps  handleClickScroll={handleClickScroll} />
            </div>
            {/* <Secureform /> */}
            <ContactComplaint />
            <div className='border-b-4 border-orange absolute right-0 left-0'>
            </div>
            <ProductForm  ref={ref}/>
            <HomeComponent />



        </div>
    )
}

export default page