import React from 'react';
import Banner from '@/app/components/KnowledgeBase/Banner';
import Homeinte from '@/app/components/LayoutNew/Homeinte';
import KnowledgeSection3 from '@/app/components/KnowledgeBase/KnowledgeSection3';
import KnowlwdgeSection4 from '@/app/components/KnowledgeBase/KnowlwdgeSection4';
import ProductForm from '@/app/components/Products/ProductForm';

import HomeComponent from '@/app/components/Home/HomeComponent';
import Panelcardnew from '@/app/components/PanelCardNew/PanelCardNew';
import KnowledgeSection2 from '@/app/components/KnowledgeBase/KnowledgeSection2';

const page = () => {
  return (
    <div className='bg-white'>
<Banner/>
<Homeinte/>
<KnowledgeSection2/>
<KnowledgeSection3/>
{/* <KnowlwdgeSection4/> */}
{/* <KnowledgeSection5/> */}
{/* <KnowledgeSection6/> */}
<Panelcardnew/>
<ProductForm/>
<HomeComponent />
    </div>
  )
}

export default page;