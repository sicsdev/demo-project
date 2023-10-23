import { useRef, useState } from "react";
import { FormWrapper } from "./FormWrapper";
import "./secondStep.css";

const AccordionItem = (props) => {
  const contentEl = useRef();
  const { handleToggle, active, faq } = props;
  const { header, id, text, inputFields } = faq;

  return (
    <div className="rc-accordion-card">
      <div className="rc-accordion-header">
        <div
          className={`rc-accordion-toggle p-3 ${active === id ? 'accordion_active' : ''}`}
          onClick={() => handleToggle(id)}
        >
          <h5 className="rc-accordion-title text-xl font-bold">{header}</h5>
          <i className="fa fa-chevron-down rc-accordion-icon"></i>
        </div>
      </div>
      <div
        ref={contentEl}
        className={`rc-collapse ${active === id ? "show" : ""}`}
        style={
          active === id
            ? { height: contentEl?.current?.scrollHeight }
            : { height: "0px" }
        }
      >
        <div className="rc-accordion-body">
          {/* <p className="mb-0">{text}</p> */}
          {inputFields.map((inputField) => (
            <div className="my-2">
              {inputField.map((ele) => (
                <div className="block  sm:flex border-b justify-between my-2 p-4">
                  <span className="text-base mb-3 sm:mb-0 font-normal inline-block">
                    {ele.text}
                  </span>{" "}
                  <input
                    name={ele.text.replace(" ", "").toLowerCase()}
                    className="border border-[#d4d4d4] font-medium px-3 min-h-[35px] bg-[#0000000d]"
                    placeholder={ele.text.replace(/\s+/g, "").toLowerCase()}
                  // onChange={}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export function SecondStep({ street, city, state, zip, updateFields }) {
  const faqs = [
    {
      id: 1,
      header: "Unified communication profile",
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
      inputFields: [
        [{ text: "Number of users" }, { text: "Number of locations" }],
        [
          {
            text: "PSTN charges (including connectivity, voice and data continuity)",
          },
          { text: "International calling" },
          { text: "Audio and video conferencing" },
          { text: "Team messaging" },
          { text: "Audio and video conferencing" },
          { text: "Team messaging" },
          { text: "Service, maintenance, and support" },
          { text: "Desk phones" },
          {
            text: "Facilities costs on PBX (including space, power, cooling, etc.)",
          },
          { text: "Internet Fax services" },
        ],
      ],
    },
  ];

  const [active, setActive] = useState(1);

  const handleToggle = (index) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };

  return (
    <FormWrapper title="Customize assumptions">
      <div className="mb-4">
        Tell us about current phone, video and team messaging costs.
      </div>

      <div className="container-fluid mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 mt-2">
            <div className="shadow-lg bg-[#fff] rounded-md text-sm  font-semibold text-[#475f7b] ">
              <div className="card-body">
                {faqs.map((faq, index) => {
                  return (
                    <AccordionItem
                      key={index}
                      active={active}
                      handleToggle={handleToggle}
                      faq={faq}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
}
