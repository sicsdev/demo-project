import React from "react";
import "./Accordian.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import List from "../Layout/components/List";
import Link from "next/link";
import MobileList from "../Layout/components/MobileList";
const Accordian = ({ setShow, nav_links }) => {
  return (
    <div className="nav-accordian h-[100vh] overflow-y-scroll">
      <Accordion allowZeroExpanded>
        {nav_links.map((element, key) => (
          <AccordionItem key={key}>
            <AccordionItemHeading 
            className="mobile_arroww">
              <AccordionItemButton>
                <Link href={element.link}>
                  <h3
                    className="text-heading text-md font-semibold"
                    onClick={() => {
                      if (
                        element.name == "Pricing" ||
                        element.name == "Developers"
                      ) {
                        setShow(false);
                      }
                    }}
                  >
                    {element.name}
                  </h3>
                </Link>
              </AccordionItemButton>
            </AccordionItemHeading>
            {element.card.links.length > 0 && (
              <AccordionItemPanel>
                <MobileList
                  className={"grid grid-cols-1 gap-8"}
                  nav_links={element.card.links}
                  setShow={setShow}
                />
              </AccordionItemPanel>
            )}
          </AccordionItem>
        ))}
      </Accordion>
      <div className="text-center my-10">
        <Link href={"/free-trial"}>
          {" "}
          <button
            onClick={(e) => setShow(false)}
            type="button"
            className="inline-block w-[80%]   bg-[#F5455C] hover:bg-black text-white hover:text-white px-8 pb-2 pt-2.5 text-xs  font-medium uppercase leading-normal  shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150  ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-white focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] "
          >
            Get Started
          </button>{" "}
        </Link>
      </div>
      <div className="text-center my-10">
        <Link href={"/login"}>
          {" "}
          <button
            // onClick={(e) => setShow(false)}
            type="button"

            className="inline-block w-[80%]    bg-primary border-2 border-primary  leading-normal text-white hover:text-white hover:bg-primary  disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]  px-8 pb-2 pt-2.5 text-xs  font-medium uppercase    "

         >
            Sign in
          </button>{" "}
        </Link>
      </div>
     
    </div>
  );
};

export default Accordian;
