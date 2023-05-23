import React from 'react'
import Card from '../Common/Card/Card'
import Image from 'next/image'
import Button from '../Common/Button/Button'
const Ecommerce = () => {
    const card_data = [
        {
            img: "https://assets-global.website-files.com/5e4ff204e7b6f80e402d407a/6391974fb726ba22baed8784_627e5a55b2b37eb239660d04_shopify.svg",
            title: "Discover Tempo for Shopify"
        },
        {
            img: "https://assets-global.website-files.com/5e4ff204e7b6f80e402d407a/6391974f430461c497a6ef41_627e5a5f4b5a3c77f4c65455_shopify-plus.svg",
            title: "Discover Tempo for Shopify"
        },
        {
            img: "https://assets-global.website-files.com/5e4ff204e7b6f80e402d407a/6391974c6a1cda997d5c31ab_627e5c0f8800137edf8249de_bigcommerce.svg",
            title: "Discover Tempo for Shopify"
        },
        {
            img: "https://assets-global.website-files.com/5e4ff204e7b6f80e402d407a/6391974f368c9d59d69789a3_627e5a6f4b3cfdd2865f183d_magento.svg",
            title: "Discover Tempo for Shopify"
        }
    ]
    const small_card_data = [
        {
            img: "https://assets-global.website-files.com/5e78f62c08f1bb8c2d788576/607b189540ffcbfbe724a120_attentive-logo.png",
            title: "Attentive"
        },
        {
            img: "https://assets-global.website-files.com/5e78f62c08f1bb8c2d788576/6255887643bd69b2c5189977_klaviyo-flag-mark-charcoal-small.png",
            title: "Klaviyo"
        },
        {
            img: "https://assets-global.website-files.com/5e78f62c08f1bb8c2d788576/60892bebe46b22e9f1331e08_Instagram.svg",
            title: "Instagram"
        },
        {
            img: "https://assets-global.website-files.com/5e78f62c08f1bb8c2d788576/607b1954587e5fdc53a4b667_yotpo-circle-logo.jpeg",
            title: "Yopto"
        },
        {
            img: "https://assets-global.website-files.com/5e78f62c08f1bb8c2d788576/607b19a3cdd0cf1b081ba237_f_logo_RGB-Blue_58.png",
            title: "Faceboook"
        },
        {
            img: "https://assets-global.website-files.com/5e78f62c08f1bb8c2d788576/61e095f7f4a2f01cc618dc99_Cobalt.png",
            title: "Recharge"
        },
    ]
    return (
        <div className="mx-auto max-w-[90%] my-12">
            <h1 className='text-center w-full sm:w-[700px] md:w-[700px] lg:w-[700px] mx-auto text-2xl sm:text-3xl md:text-4xl lg:text-5xl my-2 font-bold text-heading'>Designed for ecommerce,
                built for your <span className='text-voilet'>entire stack</span></h1>
            <div className='grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4'>
                {card_data.map((item, index) =>
                    <Card key={index} className={"group mt-8 border border-border cursor-pointer hover:border-1 hover:border-primary"}>
                        <div className=''>
                            <div className='relative mx-auto h-[100px] w-[150px]'>
                                <Image
                                    src={item.img}
                                    fill={true}
                                    alt="Picture of the author"
                                    className='m-auto object-contain'

                                />
                            </div>
                            <h3 className='text-center text-base sm:text-2xl md:text-2xl lg:text-2xl group-hover:text-primary  font-bold text-heading'>{item.title}</h3>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 float-right">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>

                        </div>
                    </Card>
                )}
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6 gap-4 mt-5'>
                {small_card_data.map((item, index) =>
                    <Card key={index} className={"group mt-8 border border-border cursor-pointer hover:border-1 hover:border-primary"}>
                        <div className=''>
                            <div className='relative mx-auto h-[80px] w-[80px] my-10'>
                                <Image
                                    src={item.img}
                                    fill={true}
                                    alt="Picture of the author"
                                    className='m-auto object-contain'

                                />
                            </div>
                            <h3 className='text-center text-base sm:text-xl md:text-xl lg:text-xl group-hover:text-primary mt-5 font-bold text-heading mb-5'>{item.title}</h3>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 float-right">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>

                        </div>
                    </Card>
                )}
            </div>
            <div className='text-center mt-5'> 
                <Button
                    type={'submit'}
                    className={'px-3 py-[11px]  focus:ring-yellow-300 text-white bg-primary hover:bg-black dark:focus:ring-yellow-900'}
                >
                   Explore 80+ integrations
                </Button>
            </div>
        </div>
    )
}

export default Ecommerce