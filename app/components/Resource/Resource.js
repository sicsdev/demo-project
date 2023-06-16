import React, { useEffect } from 'react'
import Container from '../Container/Container'
import Link from 'next/link'
import Image from 'next/image'
import Card from '../Common/Card/Card'
import Button from '../Common/Button/Button'

const Resource = () => {
 
    return (
        <div className="bg-white">
        <div className="flex flex-wrap js-show-on-scroll">
          <div className="w-full sm:w-1/2">
            <img
              src="resource.jpeg"
              alt="Full-width Image"
              className="w-full h-auto"
            />
          </div>
          <div className="w-full sm:w-1/2 flex items-center justify-center">
            <div className="  items-center flex-col text-center my-5 sm:text-center md:text-center lg:text-center px-4 sm:px-8 ">
              <h2 className="font-bold text-2xl md:text-h2 lg:text-h2 sm:text-h2 sm:leading-none my-4 text-heading">
              Freshsales {" "}
                <span className="text-primary">Suite</span>
              </h2>
              <p className="text-base flex- sm:text-para md:text-para lg:text-para my-4 sm:my-8 font-base text-heading">
              Looking for an all-in-one sales and marketing solution? Freshsales Suite combines the power of sales, marketing, chat, and telephony in one AI-powered solution. Generate qualified leads, build strong pipelines, accelerate revenue all while delivering customer delight.
              </p>
              <Link href="/help">
              <Button
                type={"button"}
                className={
                  "mr-2 py-[11px]  px-2 focus:ring-yellow-300 text-white bg-black hover:bg-primary dark:focus:ring-voilet-900"
                }
              >
                Learn More
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Resource