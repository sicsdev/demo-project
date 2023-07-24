import React from "react";
import "./Faq.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
const FaqAccordian = ({ items, title }) => {
  return (
    <div className="w-[90%] sm:w-[60%] m-auto">
      <div className="faq-accordian js-show-on-scroll">
        <h2 className=" mb-6 font-bold my-4 text-center text-2xl md:text-h2 lg:text-h2 sm:text-h2 sm:leading-none text-heading  ">
          {title}
        </h2>
        <Accordion allowZeroExpanded>
          {items.map((element, key) => (
            <AccordionItem
              key={key}
              style={{ padding: "10px", paddingLeft: "0px" }}
            >
              <AccordionItemHeading>
                <AccordionItemButton>
                  <h3 className="text-heading tracking-wider text-lg sm:text-xl md:text-xl lg:text-xl font-semibold">
                    {" "}
                    {element.question}
                  </h3>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>{element.answer}</AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FaqAccordian;
