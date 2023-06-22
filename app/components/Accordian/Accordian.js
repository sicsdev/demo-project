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
const Accordian = ({ setShow, nav_links }) => {
  return (
    <div className="nav-accordian  h-[100vh] overflow-y-scroll">
      <Accordion allowZeroExpanded>
        {nav_links.map((element, key) => (
          <AccordionItem key={key}>
            <AccordionItemHeading className="mobile_arrow">
              <AccordionItemButton>
                <Link href={element.link}>
                  <h3
                    className="text-heading text-md font-semibold"
                    onClick={() => {
                      if (element.name == "Pricing") {
                        setShow(false);
                      }
                    }}
                  >
                    {" "}
                    {element.name}
                  </h3>
                </Link>
              </AccordionItemButton>
            </AccordionItemHeading>
            {element.card.links.length > 0 && (
              <AccordionItemPanel>
                <List
                  className={"grid grid-cols-1 gap-8"}
                  nav_links={element.card.links}
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
            className="inline-block w-[80%]  bg-white px-8 pb-2 pt-2.5 text-xs rounded-2xl font-medium uppercase leading-normal text-heading shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 border ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-white focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] "
          >
            Get Started
          </button>{" "}
        </Link>
      </div>
    </div>
  );
};

export default Accordian;
