import React from 'react';
import Banner from '@/app/components/KnowledgeBase/Banner';
import Homeinte from '@/app/components/LayoutNew/Homeinte';
import KnowledgeSection2 from '../../../components/KnowledgeBase/KnowledgeSection2';
import KnowledgeSection3 from '@/app/components/KnowledgeBase/KnowledgeSection3';
import KnowlwdgeSection4 from '@/app/components/KnowledgeBase/KnowlwdgeSection4';
import ProductForm from '@/app/components/Products/ProductForm';
import KnowledgeSection5 from '@/app/components/KnowledgeBase/KnowledgeSection5';
import KnowledgeSection6 from '@/app/components/KnowledgeBase/KnowledgeSection6';
import Home from '../../page';
import HomeComponent from '@/app/components/Home/HomeComponent';
import Panelcardnew from '@/app/components/PanelCardNew/PanelCardNew';

const page = () => {
  return (
    <div className='bg-white'>
<Banner/>
<KnowledgeSection2/>
<Homeinte/>

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