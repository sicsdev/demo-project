"use client"
import React, { useState, useEffect } from "react";
import SkeletonLoader from '@/app/components/Skeleton/Skeleton';
import './HomeInteCustom.css'

const Homeinte = () => {
  const images = [
    { url: "/nextmed-color2.svg" },
    { url: "/simplesentiments-color3.svg" },
    { url: "/labpass-color2.svg" },
    { url: "/perry_logo.png" },
  ];
  const [loading, setLoading] = useState(true);
  const [loadingEmbed, setLoadingEmbed] = useState(false)
  const [currentEmbedSelected, setCurrentEmbedSelected] = useState('')
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    let defaultId = "07edd680-e6fa-4ca3-ac1e-fcc10b4c6f71"
    sessionStorage.setItem('deflectionEmbedWidgetId', defaultId)
    setCurrentEmbedSelected(defaultId)
    setTimeout(() => {
      setLoading(false);
    }, 500);

    const id = setInterval(() => {
      changeEmbedWidgetIdToNext();
    }, 10000);
    setIntervalId(id);

    return () => { clearInterval(id) };


  }, []);

  const changeEmbedWidgetIdToNext = () => {
    let embedId = sessionStorage.getItem('deflectionEmbedWidgetId')
    const currentIndex = embedItems.findIndex(item => item.id === embedId);

    let nextItem = embedItems[currentIndex + 1]
    let nextId;
    if (currentIndex + 1 == 4) {
      nextId = embedItems[0].id
    } else {
      nextId = embedItems[currentIndex + 1].id
    }
    changeEmbedWidgetId(nextId)
  }


  const changeEmbedWidgetId = (id) => {
    sessionStorage.setItem('deflectionEmbedWidgetId', id)
    setTimeout(() => {
      setCurrentEmbedSelected(id)
    }, 200);
  }

  const handleStopCarousel = () => {
    clearInterval(intervalId);
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

  const handleChangeAndStopTimer = (id) => {
    changeEmbedWidgetId(id)
    handleStopCarousel()
  }


  return (
    <div className="icons pt-[1px] sm:pt-4 pb-12 w-full mx-auto mt-5">
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
        <div className='flex overflow-x-auto gap-2 md:gap-5 xl:gap-10 justify-center hide-scrollbar mt-5'>
          {embedItems.map(item => (
            <div className={`flex-col flex justify-center md:flex gap-3 items-center px-3 md:px-5 py-2 cursor-pointer hover:text-primary ${currentEmbedSelected == item.id && 'text-sky border-sky border rounded-md'}`} onClick={() => handleChangeAndStopTimer(item.id)}>
              <img className="h-10 w-10 flex justify-center" src={item.imgSrc} alt={item.title} />
              <small className="truncate whitespace-nowrap overflow-hidden"><b>{item.title}</b></small>
            </div>
          ))}

        </div>


        <div className='flex flex-column justify-center mt-5 relative' style={{ minHeight: '400px', marginTop: '10px' }} >
          <div id="chatbot_widget" className={`chatbot_widget`} style={{ width: '850px' }} onClick={handleStopCarousel}></div>
        </div>


      </div>
    </div>
  );
};

export default Homeinte