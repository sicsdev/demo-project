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
        <h2 className="block !font-[600] text-2xl md:text-[42px]   text-center my-[1rem] md:mb-8 relative text-heading md:leading-[3rem]">
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
                  <h3 className="text-heading tracking-wider text-lg sm:text-[1.5rem] font-[600]">
                    {" "}
                    {element.question}
                  </h3>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel><h2 className="text-[16px] sm:text-[16px]">{element.answer}</h2></AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FaqAccordian;
