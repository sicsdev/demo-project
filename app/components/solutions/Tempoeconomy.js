import React from "react";

const Tempoeconomy = () => {
  return (
    <div className="bg-white pb-0 sm:pb-8">
      <div className="mx-auto max-w-[90%] sm:max-w-[90%] pt-1 pb-8">
        <div className="sm:max-w-[50%] w-full mb-6 sm:mb-12">
          {/* <h6 class="font-bold text-xl black py-1 text-primary">Pricing</h6> */}
          <h1 class="text-left text-2xl tracking-wide text-heading sm:text-3xl md:text-4xl lg:text-4xl my-2 font-bold ">
            Optimize Your Customer Support with Tempo Chat{" "}
          </h1>
          <p className="sm:mt-4 sm:mb-3 mb-3 text-justify">
            Empower your platform with an AI that never sleeps. Tempo Chat helps
            you efficiently tackle complex support tickets, allowing you to
            focus on improving your customer journey. Cut your customer service
            costs and pay only for what you use.
          </p>
        </div>
        <div className="flex flex-col sm:grid sm:grid-cols-2 justify-evenly items-center gap-4 sm:gap-10">
          <div className="">
            <h6 class="font-bold text-xl black py-1 text-primary">
              24/7 Chat Support{" "}
            </h6>
            <p className="sm:mt-4 text-justify">
              Meet your customers' needs at any hour. Our round-the-clock chat
              support ensures you never miss a beat, and with nearly instant responses,
              customer satisfaction is just a few clicks away.
            </p>{" "}
            <div className=" sm:w-[85%] sm:mt-10">
              <div className="w-full mt-[40px] sm:mt-0">
                <div className="h-[100%] mb-6 sm:mb-0">
                  <img
                    src="/tabs/aichat.gif"
                    className="w-auto sm:h-[354px] mr-auto shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="">
            {" "}
            <h6 class="font-bold text-xl black py-1 text-primary">
              Intelligent Automation{" "}
            </h6>
            <p className="sm:mt-4 text-justify">
              Leverage the power of advanced AI models, ChatGPT and GPT-4.
              Intelligent automation not only streamlines your operations but
              also keeps improving as it learns from your data.
            </p>
            <div className=" sm:w-[85%] sm:mt-10">
              <div className="w-full  mt-[40px] sm:mt-0">
                <div className="h-[100%]  mb-6 sm:mb-0">
                  <img
                    src="/tabs/Analytics-Gif.gif"
                    className="w-auto sm:h-[354px] mr-auto shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="sm:mt-8">
            <h6 class="font-bold text-xl black py-1 text-primary">
              Seamless Integrations{" "}
            </h6>
            <p className="sm:mt-4 text-justify">
              Enjoy the ease of plug-and-play with Tempo Chat. Integrate your
              payments, CRM, inventory management, and backend in as little as one click.
            </p>{" "}
            <div className=" sm:w-[85%] sm:mt-10">
              <div className="w-full  mt-[40px] sm:mt-0">
                <div className="h-[100%]  mb-6 sm:mb-0">
                  <img
                    src="/tabs/three.gif"
                    className="w-auto sm:h-[354px] mr-auto shadow-md "
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="sm:mt-8">
            {" "}
            <h6 class="font-bold text-xl black py-1 text-primary">
              Transparent Billing{" "}
            </h6>
            <p className="sm:mt-4 text-justify">
              Experience clear and fair billing. At Tempo Chat, you're charged
              only 25 cents per chat response. It's the simplicity of paying for
              exactly what you use.
            </p>
            <div className=" sm:w-[85%] sm:mt-10">
              <div className="w-full  mt-[40px] sm:mt-0">
                <div className="h-[100%]  mb-6 sm:mb-0">
                  <img
                    src="/tabs/Billing-GIF.gif"
                    className="w-auto sm:h-[354px] mr-auto  shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tempoeconomy;
