import HomeComponent from '@/app/components/Home/HomeComponent';
import Panelcardnew from '@/app/components/PanelCardNew/PanelCardNew';
import Concierge from '@/app/components/Products/Concierge';
import Banner from '@/app/components/Products/email/Banner';
import ProductForm from '@/app/components/Products/email/ProductForm';
import ProductSection2 from '@/app/components/Products/email/ProductSection2';
import ProductSection3 from '@/app/components/Products/email/ProductSection3';
import ProductSection4 from '@/app/components/Products/email/ProductSection4';
import ProductSection5 from '@/app/components/Products/email/ProductSection5';
import ProductSection6 from '@/app/components/Products/email/ProductSection6';
import ProductSection7 from '@/app/components/Products/ProductSection7';
import React from 'react'

const page = () => {
  return (
    <div className='bg-white'>
      <Banner />
      <ProductSection2 />
      <ProductSection3 />
      {/* <ProductSection4 /> */}
      {/* <ProductSection5 /> */}
      {/* <ProductSection6 /> */}
      <Concierge />
      <Panelcardnew/>
      <ProductSection7 />
      <ProductForm />
      <HomeComponent />
    </div>
  )
}

export default page;