"use client"
import React, { useState, useEffect } from "react";
import SkeletonLoader from '@/app/components/Skeleton/Skeleton';

const Homeinte = () => {
  const images = [
    { url: "/nextmed-color2.svg" },
    { url: "/simplesentiments-color3.svg" },
    { url: "/labpass-color2.svg" },
    { url: "/perry_logo.png" },
  ];
  const [loading, setLoading] = useState(true);
  const [loadingEmbed, setLoadingEmbed] = useState(false)
  const [currentEmbedSelected, setCurrentEmbedSelected] = useState(sessionStorage.getItem('deflectionEmbedWidgetId'))

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);


  const changeEmbedWidgetId = (id) => {
    sessionStorage.setItem('deflectionEmbedWidgetId', id)
    setCurrentEmbedSelected(id)
  }

  const embedItems = [
    {
      id: '07edd680-e6fa-4ca3-ac1e-fcc10b4c6f71',
      imgSrc: '/images/hospital.png',
      title: 'Healthcare'
    },
    {
      id: '93a527f7-1069-4933-bfea-9ee8ac6ad9bf',
      imgSrc: '/images/airplane.png',
      title: 'Airline'
    },
    {
      id: '261dacb6-875d-4f8d-aaa5-cd47b0f5607c',
      imgSrc: '/images/phone.png',
      title: 'Telecoms'
    },
    {
      id: 'af9497fc-c837-495e-a7f7-cd034bbf8df7',
      imgSrc: '/images/package.png',
      title: 'E-Commerce'
    }
  ];


  return (
    <div className="icons pt-[1px] sm:pt-4 pb-12 w-full mx-auto">
      <div className="sm:mb-8 mx-auto max-w-[90%]">
        <h1 className='text-center text-2xl sm:text-[38px]  sm:leading-8 my-2 font-bold sm:my-6 font-base text-[black]' >
          {loading ? <SkeletonLoader count={1} height={30} width={"60%"} /> :
            "Demo chat with common industries:"
          }
        </h1>
        {/* <div className="grid sm:flex sm:justify-center grid-cols-2 sm:grid-cols-7 text-center gap-2 sm:gap-0">
          {images.map((element, key) => (
            <div
              className="relative w-full mx-auto sm:mx-10 mt-6 img-div-2"

              key={key}
            >
              {loading ? (
                <SkeletonLoader count={1} height={40} width={150} />
              ) : (
                <img
                  src={element.url}
                  fill={true}
                  alt="Picture of the author"
                  className={`m-auto object-contain`}
                />
              )}
            </div>
          ))}
        </div> */}
        <div className='flex gap-16 justify-center'>

          {embedItems.map(item => (
            <div className={`flex gap-3 items-center px-5 py-2 cursor-pointer hover:text-primary ${currentEmbedSelected == item.id && 'text-primary'}`} onClick={() => changeEmbedWidgetId(item.id)}>
              <img className="h-8 w-8" src={item.imgSrc} alt={item.title} />
              <small>{item.title}</small>
            </div>
          ))}

        </div>


        <div className='flex flex-column justify-center mt-5' style={{ minHeight: '500px', marginTop: '50px' }}>
          <div id="chatbot_widget" className={`shadow-xl`} style={{ width: '850px' }}></div>
        </div>


      </div>
      {/* <div className="text-center">
        <button
          className="text-[#252C47] text-[20px] px-6 border-[3px] border-[#dfe2eb] hover:border-[#252c47] sm:mt-4 mx-auto rounded-2xl p-4 font-semibold"
        >
          See customer stories
        </button>
      </div> */}
    </div>
  );
};

export default Homeinte