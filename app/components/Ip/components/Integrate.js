
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import SkeletonLoader from '../../Skeleton/Skeleton';
const tiles_icons = [
    {
        name: "Stripe",
        logo: "/integrations/stripe.svg",
        grayscale: false,
        link: "/article/stripe-integration",
        ele: "Stripe Integration",
    },
    {
        name: "Slack",
        logo: "/integrations/slack.svg",
        grayscale: true,
        link: "/article/slack-integration",
        ele: "Slack Integration",
    },

    {
        name: "HubSpot",
        logo: "/integrations/hubspot.svg",
        grayscale: true,
        link: "/article/hubspot-integration",
        ele: "HubSpot Integration",
    },

    {
        name: "SalesForce",
        logo: "/integrations/sales-force.svg",
        grayscale: true,
        link: "/article/salesforce-integration",
        ele: "Salesforce Integration",
    },
    {
        name: "Microsoft Teams",
        logo: "/integrations/teams.svg",
        grayscale: true,
        link: "/article/microsoft-teams-integration",
        ele: "Microsoft Teams Integration",
    },

    {
        name: "PayPal",
        logo: "/integrations/paypal.svg",
        grayscale: false,
        link: "/article/paypal-integration",
        ele: "PayPal Integration",
    },

];

const Integrate = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);
    return (
        <div className="      icons bg-[#ffffff] pt-[1px] sm:pt-4 pb-4 sm:pb-12 w-full sm:w-[1440px] mx-auto">
            <div className='main-wrapper-integrate  mx-auto max-w-[90%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[90%]  sm:py-10 w-full sm:w-[1440px] '>
                {/* <h1 className='text-center text-base sm:text-para md:text-para lg:text-[32px] sm:leading-8 my-2 sm:my-6 font-base text-[#252C47]' >
                    {loading ? <SkeletonLoader count={1} height={30} width={"60%"} /> :
                        "Integrate with Ease"
                    }
                </h1> */}
        <h1 className='text-center text-base sm:text-[38px]  sm:leading-8 my-2 font-bold sm:my-6 font-base text-[black]' >
                {loading ? <SkeletonLoader count={1} height={30} width={"60%"} /> :
                    "Integrate with Ease"
                }
            </h1>
                <p className='text-center'>
                    {loading ? <SkeletonLoader count={1} height={30} width={"80%"} /> :
                        "Automated API Connections • Dynamic Learning Center • Drag-and-Drop Workflow Builder"
                    }


                </p>
                <div className='mt-12 grid grid-cols-3 sm:flex justify-center gap-16 items-center'>
                    {tiles_icons.map((element, key) =>
                        <div className=" relative rounded-lg " key={key}>
                            {loading ?
                                <SkeletonLoader count={1} height={80} width={60} /> :
                                <Image
                                    fill={"true"}
                                    className={` mx-auto rounded-lg !static !w-[80px] !h-auto`}
                                    alt="logo.png"
                                    src={element.logo}
                                />}

                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Integrate