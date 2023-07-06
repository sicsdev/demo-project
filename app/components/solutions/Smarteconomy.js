import React from "react";

const Smarteconomy = () => {
  return (
    <div className="bg-white">
      <div className=" mx-auto max-w-[90%] sm:max-w-[90%]   py-10">
      <div className="sm:max-w-[50%] w-full">
            <h6 class="font-bold text-xl black py-1 text-primary">Pricing</h6>
            <h1 class="text-left text-2xl tracking-wide text-heading sm:text-3xl md:text-4xl lg:text-4xl my-2 font-bold ">
              Give creators new ways to earn money on your platform{" "}
            </h1>
            <p className="sm:mt-4 sm:mb-3 mb-3 text-justify">
              Stripe’s products make it easy for creators to earn more revenue
              on your platform with minimal engineering, legal, and compliance
              investment. Help creators build stronger relationships with their
              fans by allowing them to accept payments from around the world in
              exchange for sharing their content and craft. You can also help
              creators manage their cash flow by issuing credit cards and
              digital wallets.
            </p>
          </div>
        <div className=" flex flex-col sm:grid sm:grid-cols-2 justify-evenly items-center gap-10">
      
          <div className="">
            <h6 class="font-bold text-xl black py-1 text-primary">
              Ticket sales
            </h6>
            <p className="sm:mt-4 text-justify">
              From online conversations to concerts, creators are always looking
              for opportunities to interact with their fans. With ticket sales,
              fans can connect with creators and pay them for their time and
              energy.
            </p>{" "}
            <div className=" sm:w-[80%] sm:mt-5">
              <div className="w-full  mt-[40px] sm:mt-0">
                <div className="h-[100%]  mb-6 sm:mb-0">
                  <img
                    src="/ticketed_sales.webp"
                    className="w-full sm:h-[354px] m-auto "
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="">
            {" "}
            <h6 class="font-bold text-xl black py-1 text-primary">
              Tips from fans
            </h6>
            <p className="sm:mt-4 text-justify">
              Drive increased creator-to-fan engagement by unlocking tipping for
              content on your platform. Show your support for creators by
              tipping them for the content they create.
            </p>
            <div className=" sm:w-[80%] sm:mt-5 ">
              <div className="w-full  mt-[40px] sm:mt-0">
                <div className="h-[100%]  mb-6 sm:mb-0">
                  <img
                    src="/tips_from_fans.webp"
                    className="w-full sm:h-[354px] m-auto "
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <h6 class="font-bold text-xl black py-1 text-primary">
              Content and membership subscriptions{" "}
            </h6>
            <p className="sm:mt-4 text-justify">
              Allow creators to build recurring revenue streams with their fans
              through memberships and subscriptions. Creators can sell written
              content, podcasts, online courses, and more.
            </p>{" "}
            <div className=" sm:w-[80%] sm:mt-5">
              <div className="w-full  mt-[40px] sm:mt-0">
                <div className="h-[100%]  mb-6 sm:mb-0">
                  <img
                    src="/membership_subscriptions.webp"
                    className="w-full sm:h-[354px] m-auto "
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="">
            {" "}
            <h6 class="font-bold text-xl black py-1 text-primary">
              Financial services
            </h6>
            <p className="sm:mt-4 text-justify">
              Use our Banking-as-a-Service APIs—Treasury and Issuing—to offer
              money-management accounts and issue cards with custom rewards to
              the creators on your platform.
            </p>
            <div className=" sm:w-[80%] sm:mt-5">
              <div className="w-full  mt-[40px] sm:mt-0">
                <div className="h-[100%]  mb-6 sm:mb-0">
                  <img
                    src="/digital_wallet.webp"
                    className="w-full sm:h-[354px] m-auto "
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

export default Smarteconomy;
