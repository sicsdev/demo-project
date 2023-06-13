import React from "react";
import Demo from "../Demo/Demo";
import { useSearchParams } from "next/navigation";

const Start = ({ params }) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("kw");
  const removeDash = (str) => {
    return str.replace(/_/g, " ");
  };

  console.log("params", removeDash(search));
  const list = [
    "Eliminates refunds",
    "Automates shipping & returns",
    "Handles customer complaints",
    "Manages subscriptions & cancellations",
  ];
  return (
    <>
      <pre lang="js">
        <script src="https://widget-dev.usetempo.ai/v1/main.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              ChatBot.Widget({
                id: "42b15a2e-1975-41fc-8157-fd03b602a36d",
              });
            `,
          }}
        />
      </pre>
      <div className="bg-background">
        <div className=" mx-auto max-w-[90%] sm:max-w-[80%] md:max-w-[80%] lg:max-w-[80%]  py-10">
          <div className="block sm:flex md:flex lg:flex justify-evenly items-center gap-10">
            <div className="">
              <h1 className="font-bold  text-2xl text-white  md:text-h2 lg:text-h2 sm:text-h2 sm:leading-none mb-2">
                Your one stop {removeDash(search)} solution{" "}
              </h1>
              <h1 className=" font-bold  text-2xl text-white  md:text-h2 lg:text-h2 sm:text-h2 sm:leading-none ">
                <span className="text-first-section-color">Never think </span>{" "}
                about customer service again
              </h1>
              <ul className="list-none my-6 sm:my-6">
                {list.map((element, key) => (
                  <li key={key} className="my-2 sm:my-2 tracking-normal">
                    <span className="flex gap-3  text-custom-small  text-xl align-bottom font-semibold">
                      {" "}
                      &#x2713; {element}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <Demo />
          </div>
        </div>
      </div>
    </>
  );
};

export default Start;
