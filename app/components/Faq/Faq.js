import React, { useState } from "react";

const faqData = [
  {
    question: "What reporting do you offer?",
    answer:
      "Klaviyo offers pre-built and templates for email reporting, as well as custom options, with a full suite of reporting tools to help you understand how your campaigns, automations, and segments are performing. Through our native reporting tools, you can leverage a wide variety of data points to measure performance, figure out what is and isn’t working, and discover opportunities for improvement. The Klaviyo reporting tool tracks the growth of your list, campaign send metrics, and automation effectiveness—offering both high-level and detailed reporting, depending on who will be getting the report.",
  },
  {
    question:
      "How does Klaviyo account for machine opens coming from Apple’s Mail Protection Privacy feature?",
    answer:
      "Within the platform there is an option for an Apple Privacy Open flag (which is set to either True or False for every open event). This will differentiate MPP opens from true recipient engagement.",
  },
  {
    question: "What A/B testing functionality do you offer?",
    answer:
      "Klaviyo has robust ​​A/B testing functionality for email, including email campaigns, automated email flows, flow branches, and sign-up email forms. You can test different subject lines, content blocks, optimal send times, form colors, fonts, CTAs, and more. You can also set-up variations, do split testing, and get reliable data to understand the statistical significance of one test performance over another.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="bg-white  w-full  sm:py-8 md:py-8 lg:py-8  sm:px-4 px-4 lg:px-4 relative group">
      <h2 className="font-bold  text-2xl  md:text-5xl lg:text-5xl sm:text-5xl text-center my-8 text-heading">
        FAQ
      </h2>
      <div className="accordion">
        {faqData.map((faq, index) => (
          <div
            className="accordion-item"
            key={index}
            style={{ borderTop: "1px solid rgb(205, 206, 206)" }}
          >
            <h3
              className="font-bold text-xl text-left my-8 flex justify-between js-show-on-scroll"
              onClick={() => toggleAccordion(index)}
              style={{ cursor: "pointer" }}
            >
              <button
                className={`accordion-title text-left w-full sm:w-4/5${
                  activeIndex === index ? "active" : ""
                }`}
              >
                {faq.question}
              </button>

              <svg
                className={`w-5 h-5 ${activeIndex === index ? "rotate-180" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 9 5"
                color="currentColor"
              >
                <path
                  fill="currentColor"
                  d="M.88 0 4.5 3.101 8.12 0 9 .914 4.5 5 0 .914.88 0Z"
                ></path>
              </svg>
            </h3>
            {activeIndex === index && (
              <div
                className={`accordion-content ${
                  activeIndex === index ? "open" : "closed"
                }`}
              >
                <p className="pb-10 js-show-on-scroll">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
