import React from "react";

const News = () => {
  const images = [
    {
      name: "CUSTOMER SERVICE 7 MIN READ",
      title: "Response Time: Vol. 6",
      class:"border-r",
    },
    {
      name: "NEWS & UPDATES 7 MIN READ",
      title:
        "Unleashing productivity: Learn how AI boosts customer service team productivity by 14%,",
      class:"border-r",

    },
    
    {
      name: "CUSTOMER SERVICE 30 MIN WATCH",
      title: "Response Time: Vol. 6",
      class:"border-r",

    },
    {
      name: "NEWS & UPDATES 4 MIN READ",
      title:
        "Unleashing productivity: Learn how AI boosts customer service team productivity by 14%,",
      class:"",

    },
  ];
  return (
    <div className=" bg-white  ">
      
      <div className="my-8 mx-auto max-w-[100%]">
        <h1 className="text-center text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
          Latest News
        </h1>
        <hr class="h-px  bg-gray-200 sm:border-b-0 lg:border-b-0 md:border-b-0 border-b-0 dark:bg-gray-700 " />

        <div className="grid grid-cols-2 sm:grid-cols-4 text-center ">
          {images.map((element, key) => (
            <div
              className={`${element.class} relative w-full mx-auto mt-6 hover:text-[black]  p-4 mr-3`}
              key={key}
            >
              <p className="text-[12px] mb-3">{element.name}</p>
              <p className="text-black font-bold">{element.title}</p>
            </div>
          ))}
        </div>
      </div>
      <hr class="h-px my-8 bg-gray-200 border-b-0 dark:bg-gray-700 left-0" />
    </div>
  );
};

export default News;
