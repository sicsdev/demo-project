import HomeComponent from '@/app/components/Home/HomeComponent';
import Panelcardnew from '@/app/components/PanelCardNew/PanelCardNew';
import Banner from '@/app/components/Products/Banner';
import Concierge from '@/app/components/Products/Concierge';
import ProductForm from '@/app/components/Products/ProductForm';
import ProductSection2 from '@/app/components/Products/ProductSection2';
import ProductSection3 from '@/app/components/Products/ProductSection3';
import ProductSection4 from '@/app/components/Products/ProductSection4';
import ProductSection5 from '@/app/components/Products/ProductSection5';
import ProductSection6 from '@/app/components/Products/ProductSection6';
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
      <Concierge/>
      <Panelcardnew/>
      <ProductSection7 />
      <ProductForm />
      <HomeComponent />
    </div>
  )
}

export default page;