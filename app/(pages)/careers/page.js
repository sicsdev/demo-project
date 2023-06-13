"use client";
import React from "react";
import Jobsection from "@/app/components/career/Jobsection";
import Container from "@/app/components/Container/Container";
import axios from "axios";
import { useEffect } from "react";

import { useState } from "react";
const Page = () => {
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(
        "https://public-api.wordpress.com/rest/v1.1/sites/usetempo.ai/posts?category=careers"
      )
      .then((res) => setData(res.data));
  }, []);

  return (
    <div className=" bg-white py-4 ">
      <div className="my-8 mx-auto max-w-[90%]">
        <div className="text-center text-h6 sm:text-h2 md:text-h2 lg:text-h2 sm:leading-8 my-2 sm:my-6 font-semibold text-heading">
          {data?.posts[0]?.title}
        </div>
<div>
        <div dangerouslySetInnerHTML={{ __html: data?.posts[0]?.content }}></div>
        </div>
        <p
          type={"submit"}
          className={
            "py-2 px-8 cursor-pointer text-center focus:ring-yellow-300 text-black  mt-2 sm:m-0 md:m-0 lg:m-0 text-lg font-semibold  dark:focus:ring-yellow-900 rounded-lg"
          }
        >
          learn more &#8594;
        </p>

        <div className="pb-4 sm:pb-16 cursor-pointer mx-auto max-w-[90%]">
          <div
            className={
              "bg-background block sm:flex sm:flex-wrap md:flex md:flex-row lg:flex lg:flex-row justify-between shadow-2xl rounded-lg py-8 px-8 sm:py-20 md:py-20 lg:py-20  sm:px-12 lg:px-12 md:px-12   items-center relative"
            }
          >
            <div className=" sm:w-[100%] md:w-[50%] lg:w-[50%]">
              {" "}
              <h2 className=" font-bold  text-2xl  md:text-h2 lg:text-h2 sm:text-h2 sm:leading-none   text-white  ">
                Don't see the role you're interested in? Sign up to our Talent
                Community to stay in touch.
              </h2>
            </div>
            <div className="block sm:grid md:grid lg:grid grid-cols-2 gap-4">
              <button
                type={"submit"}
                className={
                  " w-full  p-2  focus:ring-yellow-300 text-lg font-semibold text-white bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-lg"
                }
              >
                sign up &#8594;
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <Jobsection /> */}
      <Container>
        <div className="customer-section">
          <h1 className=" text-h6 sm:text-h2 md:text-h2 lg:text-h2 sm:leading-8 my-2 sm:my-6 font-semibold text-heading">
            Customer Support Specialist 1{" "}
          </h1>
          <p> Chicago, Illinois </p>
          <p className=" text-h6 sm:text-h5 md:text-h5 lg:text-h5 sm:leading-8 my-2 sm:my-6 font-semibold text-heading">
            Intercom is redefining how businesses support their customers using
            powerful messaging and automation.
          </p>
          <p>
            Customer service teams from more than 25,000 global organizations,
            including Atlassian, Amazon and Lyft Business, rely on Intercom to
            deliver efficient and personal customer experiences at scale.
            Intercom is used to send over 500 million messages per month and
            enables interactions with over 600 million monthly active end users.
          </p>
          <p>
            Join the company helping businesses grow revenue through in-product
            messaging, and so much more!
          </p>
          <h1 className=" text-h6 sm:text-h2 md:text-h2 lg:text-h2 sm:leading-8 my-2 sm:my-6 font-semibold text-heading">
            What's the opportunity? 🤔
          </h1>
          <p>
            The Customer Support team is responsible for onboarding, educating,
            and supporting our customers on a global level. We start work the
            moment a customer decides they want to use Intercom, sticking with
            them every step of the way to ensure they get the most value from
            our product.
          </p>
          <p>
            This opportunity is for folks who truly love supporting customers
            and see themselves in a customer facing role long term. This is not
            a springboard into other areas or jobs at Intercom. This is a great
            role for those who are looking to be part of our support team for a
            while and who are excited about supporting Intercom’s growth with
            personal experiences.
          </p>
          <p>
            <span className="text-heading font-semibold">
              {" "}
              This position will be hybrid{" "}
            </span>{" "}
            with the expectation to work from the office 1-3 days a week and
            work from home the remaining days of the week. You are welcome to
            work from the office full-time if that is preferred.
          </p>
          <h1 className=" text-h6 sm:text-h2 md:text-h2 lg:text-h2 sm:leading-8 my-2 sm:my-6 font-semibold text-heading">
            What will I be doing? 🚀
          </h1>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="flex items-start ">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                width="60"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                ></path>
              </svg>
              Communicating efficiently and effectively with our customers - we
              use our own product to do most of our support, but you'll also be
              talking to customers on the phone every now and then
            </div>
            <div className="flex  items-start">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                width="60"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                ></path>
              </svg>
              Being the one responsible, along with the Support team, to ensure
              that all customers have a great experience with the product - a
              crucial part of the role is ensuring we make the product as easy
              to use, reliable, bug-free, and fast as possible
            </div>
            <div className="flex items-start">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                ></path>
              </svg>
              Owning customer communications and issues from initial contact
              until resolution
            </div>{" "}
            <div className="flex  items-start">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                width="60"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                ></path>
              </svg>
              Working directly with product teams to identify current issues
              and, synthesizing the diverse feedback you hear from our
              customers, offer informed opinions on potential solutions
            </div>{" "}
            <div className="flex  items-start">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                width="30"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                ></path>
              </svg>
              Becoming an encyclopedia of knowledge about how Intercom works and
              what it is capable of
            </div>
          </div>
          <p className="mt-4">What your first 6 months will look like:</p>
        </div>
      </Container>
    </div>
  );
};

export default Page;
