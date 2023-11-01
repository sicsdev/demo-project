import HomeComponent from '@/app/components/Home/HomeComponent';
import Panelcardnew from '@/app/components/PanelCardNew/PanelCardNew';
import Concierge from '@/app/components/Products/workflow/Concierge';
import Banner from '@/app/components/Products/workflow/Banner';
import ProductForm from '@/app/components/Products/workflow/ProductForm';
import ProductSection2 from '@/app/components/Products/workflow/ProductSection2';
import ProductSection3 from '@/app/components/Products/workflow/ProductSection3';
import ProductSection4 from '@/app/components/Products/workflow/ProductSection4';
import ProductSection5 from '@/app/components/Products/workflow/ProductSection5';
import ProductSection6 from '@/app/components/Products/workflow/ProductSection6';
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