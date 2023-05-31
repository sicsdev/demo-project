import React from "react";
import Carasual from "../Providers/Carasual";
import Image from "next/image";
const slides = [
  {
    background: `bg-sky`,
    title:
      "Customer service is a solved problem. Automating support for our enterprise clients has been an immense cost-saver and has provided us with an industry-leading advantage.        ",
    editor: "Dean Zimberg",
    position: "CEO & Founder ",
    img: "perry-color4.svg",
  },
  {
    background: `bg-orange`,
    title:
      "The ability to scale up customer-facing staffing and back office operations, coupled with Tempo's ChatGPT-powered automations, has really powered our business's fulfillment.      ",
    editor: "Frank Patrick",
    position: "Vice President   ",
    img: "labpass-color2.svg",

  },
  {
    background: `bg-neon`,
    title:
      "Instead of wasting my time hiring freelancers and trying to figure out new software platforms, I plugged into Tempo and was able to focus on what matters: growing my business.      ",
    editor: "Matthew Epstein",
    position: "Founder ",

    img: "simplesentiments-color3.svg",
  },
];
const Benifits = () => {
  return (
    <div className="bg-cyan-50 py-5  ">
      <h1 className="font-bold  text-2xl  md:text-5xl lg:text-5xl sm:text-5xl text-center  my-8  text-heading">
        Why customers love Tempo
      </h1>
      <Carasual>
        {slides.map((element, key) => (
          <div
            key={key}
            className={`${element.background} ease-in rounded-2xl bg-center bg-cover duration-1000 h-[500px]`}
          >
            <div className="block p-2 sm:p-5 md:p-5 lg:p-5 sm:flex md:flex lg:flex justify-center items-center gap-4">
              <div className="sm:w-[900px] md:w-[900px] lg:w-[900px] text-xs sm:text-lg md:text-lg lg:text-lg  col-span-2 font-bold text-center p-2 sm:p-10 md:p-10 lg:p-10 sm:my-16 md:my-16 lg:my-16  rounded-lg order-2 sm:-order-none md:-order-none lg:-order-none ">
                <h1 className="text-start sm:text-start md:text-start lg:text-start   text-lg sm:text-2xl md:text-3xl lg:text-4xl my-2 font-semibold sm:font-normal md:font-normal lg:font-normal text-heading">
                  {element.title}
                </h1>
                <h3 className="text-start text-lg font-normal text-gray-600">
                  {element.editor}
                </h3>
                <h3 className="text-start text-lg  font-semibold  text-violet-700">
                  {element.position}
                </h3>
              </div>

              <div className="relative p-10 sm:mt-16 md:mt-16 lg:mt-16  h-[200px] sm:h-[300px] md:h-[300px] lg:h-[300px] sm:w-[300px] md:w-[300px] lg:w-[300px]  rounded-lg order-1 sm:-order-none md:-order-none lg:-order-none">
                <Image
                  src={element.img}
                  fill={true}
                  alt="Picture of the author"
                  className="rounded-3xl bg-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </Carasual>
    </div>
  );
};

export default Benifits;
