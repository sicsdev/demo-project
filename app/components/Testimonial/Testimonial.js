import React, { useState } from "react";
import Image from "next/image";
import Card from "../Common/Card/Card";
const Testimonial = () => {
  const [index, setIndex] = useState(0);
  const team_data = [
    {
      img: "https://assets-global.website-files.com/5e4ff204e7b6f80e402d407a/5ea74e6622cbe24966972138_dave.png",
      title:
        "“Thanks to Gorgias, my customer service team has been able to increase customer satisfaction and drive customer loyalty. ”",
      name: "Dave Szymaszek",
      position: "Head of Customer Experience @ Marine Layer",
      precent: "68%",
      quote: "Decrease in resolution time",
    },
    {
      img: "https://assets-global.website-files.com/5e4ff204e7b6f80e402d407a/5ea74e9263bac005ccc061cd_guita.png",
      title:
        "“I like the pricing structure: in a startup, everybody should be an agent. Zendesk charges per agent. Gorgias' pricing is smarter.”",
      name: "Danny Taing",
      position: "Danny Taing, Founder & CEO @ Bokksu",
      precent: "120",
      quote: "Number of tickets by agent per day",
    },
    {
      img: "https://assets-global.website-files.com/5e4ff204e7b6f80e402d407a/5ea74f82f6e60aff2cc3fa3f_danny.png",
      title:
        "“With all the Gorgias integrations, my team doesn't need to jump between tools. This has helped us dramatically improve customer satisfaction.”",
      name: "Dave",
      position: "Amanda, Director of Operations @ Darn Good Yarn",
      precent: "90%",
      quote: "Customer queries form Messenger",
    },
    {
      img: "https://assets-global.website-files.com/5e4ff204e7b6f80e402d407a/5ea750175e12ffd822de29c9_amanda_darn_good_yarn.png",
      title:
        "We’ve stopped hunting and matching Facebook users to customer accounts on Shopify. The information we need is surfaced so we can respond better and faster.",
      name: "Guita Gopalan",
      position: "Head of Customer Experience @ Marine Layer",
      precent: "10x",
      quote: "Growth over the last 2 years",
    },
  ];
  const nextData = () => {
    if (team_data.length - 1 === index) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };
  const prevData = () => {
    if (index === 0) {
      setIndex(team_data.length - 1);
    } else {
      setIndex(index - 1);
    }
  };
  return (
    <div className="bg-[#D8DADC] py-5">
      <div className="my-16 cursor-pointer mx-auto max-w-[90%]">
        <Card className={"bg-white relative"}>
          <div className="block sm:flex md:flex lg:flex justify-evenly items-center">
            <div className="relative h-[200px] w-[200px]">
              <Image
                src={team_data[index].img}
                fill={true}
                alt="Picture of the author"
                className="m-auto object-contain"
              />
            </div>
            <div className="text-start transition  ease-in duration-300">
              <h1
                data-te-animation-ref
                className="text-start w-full sm:w-[700px] md:w-[700px] lg:w-[700px] mx-auto text-xl sm:text-2xl md:text-2xl lg:text-2xl my-2 font-bold text-heading "
              >
                {team_data[index].title}
              </h1>
              <h1
                data-te-animation-add-ref
                data-te-ripple-init
                data-te-ripple-color="light"
                className="text-start w-full sm:w-[700px] md:w-[700px] lg:w-[700px] mx-auto text-xl sm:text-xl md:text-xl lg:text-xl my-2 font-bold text-heading"
              >
                {team_data[index].name}
              </h1>
              <p className="text-border">{team_data[index].position}</p>
            </div>
            <div className="hidden sm:inline-block md:inline-block lg:inline-block h-[200px] min-h-[1em] w-1 self-stretch bg-voilet opacity-100 dark:opacity-50"></div>
            <div className="relative ">
              <h1 className="text-start w-full mx-auto text-xl sm:text-3xl md:text-3xl lg:text-3xl my-2 font-bold text-sky-2 ">
                {team_data[index].precent}
              </h1>
              <h1 className=" text-start sm:text-start md:text-start lg:text-start sm:w-[200px] md:w-[200px] lg:w-[200px]  text-2xl sm:text-2xl md:text-2xl lg:text-2xl my-2 font-bold text-heading">
                {team_data[index].quote}
              </h1>
              <p className=" text-xl sm:text-xl md:text-xl lg:text-xl ">
                Read their story
              </p>
            </div>
            <button
              className=" absolute top-[20%] sm:top-[50%] md:top-[50%] lg:top-[50%] -translate-x-0 translate-y-[-50%] left-0 sm:-left-5 md:-left-5 lg:-left-5 text-2xl rounded-full p-2 bg-white border-2 border-border hover:border-primary text-primary cursor-pointer"
              onClick={() => prevData()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M20.25 12a.75.75 0 01-.75.75H6.31l5.47 5.47a.75.75 0 11-1.06 1.06l-6.75-6.75a.75.75 0 010-1.06l6.75-6.75a.75.75 0 111.06 1.06l-5.47 5.47H19.5a.75.75 0 01.75.75z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              className=" absolute top-[20%] sm:top-[50%] md:top-[50%] lg:top-[50%] -translate-x-0 translate-y-[-50%] right-0 sm:-right-5 md:-right-5 lg:-right-5 text-2xl rounded-full p-2 bg-white  border-2 border-border text-primary hover:border-primary cursor-pointer"
              onClick={() => nextData()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Testimonial;
