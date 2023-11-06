"use client";
import React,{useState} from 'react';
import Link from 'next/link';
import { CheckIcon } from  "@heroicons/react/24/outline";


const KnowledgeSection6 = () => {

const [card1, setCard1] = useState(true);
const [card2, setCard2] = useState(false);
const data=[
    {
        version:"X2",
        title:"All-in-one voice, video and chat for larger teams",
        button:"Get the deal",
        list:[
            "Skills-based routing, IVR, call recording CRM","Reporting & analytics, CX journey mapping","Supervisor analytics","Supervisor analytics"
        ]
    },
    {
        version:"X4",
        title:"Advanced call handling and analytics",
        button:"Talk to Sales",
        list:[
            "Skills-based routing, IVR, call recording CRM","Reporting & analytics, CX journey mapping","Supervisor analytics","Supervisor analytics"
        ]
    },
]

const data2=[
    {
        version:"X6",
        title:"Voice contact center        ",
        button:"Contact Sales",
        list:[
            "Skills-based routing, IVR, call recording CRM","Reporting & analytics, CX journey mapping","Supervisor analytics","Supervisor analytics"
        ]
    },
    {
        version:"X7",
        title:"One interface for voice and digital interactions        ",
        button:"Contact Sales",
        list:[
            "Skills-based routing, IVR, call recording CRM","Reporting & analytics, CX journey mapping","Supervisor analytics","Supervisor analytics"
        ]
    }, {
        version:"X8",
        title:"Advanced contact center with QM and interaction analytics        ",
        button:"Contact Sales",
        list:[
            "Skills-based routing, IVR, call recording CRM","Reporting & analytics, CX journey mapping","Supervisor analytics","Supervisor analytics"
        ]
    }
]



const showCard1=()=>{
    setCard1(true);
    setCard2(false);
};

const showCard2=()=>{
    setCard1(false);
    setCard2(true);
};

    return (
        <div className='sm:p-[3rem] p-[2rem]'>
            <div className='flex sm:gap-[4rem] gap-[2rem] border-b-4	 border-[#e4e4e4] mb-[10px]'>
                <div className={card1 == true? "cursor-pointer border-b-4 border-[#fe9327] " :'cursor-pointer text-[gray]'} onClick={showCard1}>
                    <p className='text-[14px] sm:text-[19px] font-semibold flex justify-center]'>Business Communications</p>
                    <p className='text-[10px] sm:text-[14px] flex justify-center mt-[5px] mb-[10px]'>Voice. Video. Chat.</p>
                </div>
                <div className={card2 == true? "cursor-pointer border-b-4 border-[#fe9327] " :'cursor-pointer text-[gray]'} onClick={showCard2}>
                    <p className='text-[14px] sm:text-[19px] font-semibold flex justify-center'>Add Contact Center</p>
                    <p className='text-[10px] sm:text-[14px] flex justify-center mt-[5px]  '>Contact Center. Voice. Video. Chat.</p>
                </div>
                <hr/>
            </div>
            {card1 == true?   <div class="sm:grid grid-cols-3 gap-4">
                {data.map((ele,key)=>
                  <div className='items-center drop-shadow-2xl rounded-md border border-[#8080806b] overflow-hidden mb-[2rem]'>
                  <h3 className='!bg-[#8080806b] px-2 py-1 text-center text-[18px]'>Limited time offer!<span className='text-[#fe9327]'> 25% OFF</span></h3>
                  <div className='py-3 px-7 text-center'>
                      <p className='text-[18px] text-[#8080806b] mt-[34px] font-semibold'>{ele.version}</p>
                      <p className='sm:text-[22px] mb-[54px] font-semibold'>{ele.title}</p>
                      <button className="text-white   mx-auto justify-center w-full sm:mt-6 sm:flex sm:mx-auto  hover:text-heading my-5 text-center sm:my-0  text-lg font-semibold dark:focus:ring-yellow-900 rounded-lg">
                          <Link
                              href="/checkout"
                              className=" px-[20px] py-[5px] w-full rounded-[25px] bg-[#fe9327] hover:bg-black hover:text-white mb-[2rem]"
                          >
                             Contact Sales
                          </Link>
                      </button>
                       <ul className='mb-[4rem]'>
                       {ele.list.map((elem, key)=>

                       <li className='flex gap-2 items-center mb-3 text-[14px] font-semibold'><span className='bg-[#3498db] p-[3px] text-[#fff] rounded-full text-[15px] font-semibold  '><CheckIcon class="h-3 w-3 text-gray-500" /></span><span className='text-left'>{elem}

</span></li>
                      )}
                       
                   </ul>
                     
                  </div>
              </div>
                )}
            </div> : ""}
            {card2 == true?   <div class="sm:grid grid-cols-3 gap-4">
                {data2.map((ele,key)=>
                  <div className='items-center drop-shadow-2xl rounded-md border border-[#8080806b] overflow-hidden mb-[2rem]'>
                  <h3 className='!bg-[#8080806b] px-2 py-1 text-center text-[18px]'>Limited time offer!<span className='text-[#fe9327]'> 25% OFF</span></h3>
                  <div className='py-3 px-7 text-center'>
                      <p className='text-[18px] text-[#8080806b] mt-[34px] font-semibold'>{ele.version}</p>
                      <p className='sm:text-[22px] mb-[54px] font-semibold'>{ele.title}</p>
                      <button className="text-white   mx-auto justify-center w-full sm:mt-6 sm:flex sm:mx-auto  hover:text-heading my-5 text-center sm:my-0  text-lg font-semibold dark:focus:ring-yellow-900 rounded-lg">
                          <Link
                              href="/checkout"
                              className=" px-[20px] py-[5px] w-full rounded-[25px] bg-[#fe9327] hover:bg-black hover:text-white mb-[2rem]"
                          >
                             Contact Sales
                          </Link>
                      </button>
                       <ul className='mb-[4rem]'>
                       {ele.list.map((elem, key)=>

                       <li className='flex gap-2 items-center mb-3 text-[14px] font-semibold'><span className='bg-[#3498db] p-[3px] text-[#fff] rounded-full text-[15px] font-semibold '><CheckIcon class="h-3 w-3 text-gray-500" /></span><span className='text-left'>{elem}

</span></li>
                      )}
                       
                   </ul>
                     
                  </div>
              </div>
                )}
            </div> : ""}
          
        </div>
    )
}

export default KnowledgeSection6