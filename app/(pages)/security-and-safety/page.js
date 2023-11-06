import React from 'react';
import Securesteps from '@/app/components/Security/Securesteps';
import Certification from '@/app/components/Security/Certification';
import Reliability from '@/app/components/Security/Reliability';
import Secureform from '@/app/components/Security/Secureform';
import Banner from '../../components/Security/Banner';
import HomeComponent from '@/app/components/Home/HomeComponent';
import ProductForm from '@/app/components/Products/ProductForm';
import ContactComplaint from '@/app/components/Ip/Chatbot/Contact/ContactComplaint';
const page = () => {
    return (
        <div className='bg-white'>
            <Banner />
            <div className="sm:mt-[75vh]">
                <Securesteps />
            </div>
            <Certification />
            <Reliability />
            {/* <Secureform /> */}
            <ContactComplaint />
            <div className='border-b-4 border-orange absolute right-0 left-0'>
            </div>
            <ProductForm />
            <HomeComponent />


        </div>
    )
}

export default page