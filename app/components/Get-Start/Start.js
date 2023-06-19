import React, { useEffect, useState } from 'react'
import Demo from '../Demo/Demo'

const Start = () => {
    const [show, setShow] = useState(true);
    const list = [
        "Eliminates refunds",
        "Automates shipping & returns",
        "Handles customer complaints",
        "Manages subscriptions & cancellations",
    ]

useEffect(()=>{
    if (navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)) {
       setShow(false);
    } else {
        setShow(true);
       }
})


    return (<>

    {show == true? <><pre lang="js">
            <script src="https://widget-dev.usetempo.ai/v1/main.js" />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
              ChatBot.Widget({
                id: "42b15a2e-1975-41fc-8157-fd03b602a36d",
              });
            `,
                }}
            />
        </pre></> : ""}
        

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-HFHNKD99J4"></script>
        <script
            dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-HFHNKD99J4');
          `,
            }}
        />

        <div className='bg-background'>
            <div className=' mx-auto max-w-[90%] sm:max-w-[80%] md:max-w-[80%] lg:max-w-[80%]  py-10'>
                <div className='block sm:flex md:flex lg:flex justify-evenly items-center gap-10'>
                    <div className=''>
                        <h1 className=" font-bold  text-2xl text-white  md:text-h2 lg:text-h2 sm:text-h2 sm:leading-none ">
                            <span className="text-first-section-color">
                                Never think </span>  about customer service again
                        </h1>
                        <ul className='list-none my-6 sm:my-6'>
                            {list.map((element, key) =>
                                <li key={key} className='my-2 sm:my-2 tracking-normal'>
                                    <span className='flex gap-3  text-custom-small  text-xl align-bottom font-semibold'> &#x2713; {element}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                    <Demo />
                </div>
            </div>
        </div>
    </>
    )
}

export default Start