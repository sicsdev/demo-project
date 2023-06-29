import React from "react";

const slides = [
  {
    title: "ChatGPT and GPT-4 Power    ",
    text: "Harness the latest models to intelligently streamline your operations.    ",
    tag: "New",
  },
  {
    title: "Plug-and-play integration    ",
    text: "Connect your payments, CRM, inventory management, and backend with one click.    ",
    tag: "New",
  },
  {
    title: "Train on your policies    ",
    text: "Utilize our LLM connectors to analyze your FAQ and shipping/return policy to customize your workflows.    ",
  },
  {
    title: "Self-learning AI model    ",
    text: "Tempo will drive real results from day one, and get even better as it learns from more of your data.",
  },
];
const SolutionStandard = () => {
  return (
    <div className="bg-white pt-8 pb-8 sm:pb-4">
      <div className="max-w-[1400px] w-full m-auto sm:py-8 md:py-8 lg:py-8  sm:px-4 px-4 lg:px-4 relative group">
        <h2 className="text-center  text-2xl md:text-h2 lg:text-h2 sm:text-h2 sm:leading-8 my-2 font-bold text-black">
          Extremely powerful automated synergy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full m-auto sm:py-8 md:py-8 lg:py-8 sm:px-4 lg:px-4 mt-10">
          {slides.map((item, key) => (
            <div
              className="bg-black shadow-lg rounded-lg p-6 sm:p-12 md:py-7 md:px-8 hover:scale-105 transition-transform duration-300"
              style={{ border: "1px solid #2f2f2f", borderRadius: "20px" }}
              key={key}
            >
              <div className="flex flex-col-reverse sm:flex-row justify-start sm:justify-start items-start sm:items-center gap-4 mb-6 sm:mb-10">
                <h5 className="font-semibold text-xl md:text-h6 sm:leading-2 lg:text-h6 sm:text-h6 text-white js-show-on-scroll">
                  {item.title}
                </h5>
                {item?.tag && (
                  <button
                    className="font-semibold rounded-full px-4 py-1 text-black js-show-on-scroll"
                    style={{ background: "#59f2f6" }}
                  >
                    {item?.tag}
                  </button>
                )}
              </div>
              <div className="flex flex-co justify-start items-center gap-4">
                <p className="text-white text-base sm:text-para opacity-70 js-show-on-scroll">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SolutionStandard;
