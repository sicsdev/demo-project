import Link from "next/link";
import React from "react";
import Marquee from "react-fast-marquee";

const cards = [
  {
    id: "1",
    img: "/marque/1.svg",
    name: "Github",
    subheading: "File Management",
  },
  {
    id: "2",
    img: "/marque/2.svg",
    name: "Twilio",
    subheading: "Communication",
  },
  {
    id: "3",
    img: "/marque/3.svg",
    name: "Mero",
    subheading: "Collaboration",
  },
  {
    id: "4",
    img: "/marque/4.svg",
    name: "Email",
    subheading: "Communication",
  },
  {
    id: "5",
    img: "/marque/5.svg",
    name: "Slack",
    subheading: "Communication",
  },
];

const Motioncards = () => {
  return (
    <div className="motion_marque_section max-w-[90%] py-3 m-auto">
      <div class="block sm:flex m-auto sm:py-8 md:py-8 lg:py-8 sm:px-4 lg:px-4 mt-10">
        <div className="w-[100%] sm:w-[30%]">
          <h2 className="mb-5 text-black text-2xl sm:text-3xl font-bold sm:mb-7">
            Bring all the data you need into one place
          </h2>
          <p className="text-black sm:mb-5">
            Integrate your most important tools to bring more context into the
            product development process.
          </p>
          <button className="text-primary my-3 sm:my-0 text-lg font-semibold dark:focus:ring-yellow-900 rounded-lg">
            <a href="">Explore all integrations →</a>
          </button>
        </div>
        {/* marque */}
        <div className="w-[100%] sm:w-[70%] marque_section">
          <div class="flex overflow-hidden wrapper_marque">
            <Marquee pauseOnHover={true} loop={0} direction="right">
              {cards.map((item) => (
                <Link
                  key={item.id}
                  className="marque_card inline-block m-3"
                  href=""
                >
                  <div className="shadow-md rounded-lg w-[280px] p-3">
                    <div className="flex items-center gap-3">
                      <img src={item.img} />
                      <div>
                        <p>{item.name}</p>
                        <p className="text-xs">{item.subheading}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </Marquee>
            <div></div>
          </div>
          <div class="flex overflow-hidden wrapper_marque">
            <Marquee pauseOnHover={true} loop={0} direction="left">
              {cards.map((item) => (
                <Link
                  key={item.id}
                  className="marque_card inline-block m-3"
                  href=""
                >
                  <div className="shadow-md rounded-lg w-[280px] p-3">
                    <div className="flex items-center gap-3">
                      <img src={item.img} />
                      <div>
                        <p>{item.name}</p>
                        <p className="text-xs">{item.subheading}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </Marquee>
            <div></div>
          </div>
          <div class="flex overflow-hidden wrapper_marque">
            <Marquee pauseOnHover={true} loop={0} direction="right">
              {cards.map((item) => (
                <Link
                  key={item.id}
                  className="marque_card inline-block m-3"
                  href=""
                >
                  <div className="shadow-md rounded-lg w-[280px] p-3">
                    <div className="flex items-center gap-3">
                      <img src={item.img} />
                      <div>
                        <p>{item.name}</p>
                        <p className="text-xs">{item.subheading}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </Marquee>
            <div></div>
          </div>
        </div>
        {/* marque */}
      </div>
    </div>
  );
};

export default Motioncards;
