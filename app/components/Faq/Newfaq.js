"use client";
import React from "react";
const Newfaq = () => {
  const questions = [
    {
      question: "How does the free trial work?",
      answer: (
        <p className="tracking-wide text-sm sm:text-[1.25rem] sm:leading-[2rem] text-text-dark-color mt-4">
          When you sign up for Deflection AI, you will have complete access to the Deflection AI
          suite of products. $200 in free credits are granted at sign up, and
          only after you exceed those will you be charged. There is no
          obligation, monthly fee, or any kind of recurring subscription.
        </p>
      ),
    },
    {
      question: "How does usage-based billing work?",
      answer: (
        <p className="tracking-wide text-sm sm:text-[1.25rem] sm:leading-[2rem] text-text-dark-color mt-4">
          Users are billed $1 per resolved ticket. A resolved ticket is any
          conversation that does not result in a human hand off or a customer
          marks as a bad answer and has at least 3 total interactions. Please
          note that there are no limitations on response length. If a very long
          and complex email is required to resolve a query, it will still only
          cost you $1. All customers are enrolled in pay-as-you-go billing. For
          more information on payment thresholds, please{" "}
          <a style={{ fontWeight: "600" }} href="/article/pricing-overview">
            click here.
          </a>
        </p>
      ),
    },
    {
      question: "How does enterprise pricing work?",
      answer: (
        <p className="tracking-wide text-sm sm:text-[1.25rem] sm:leading-[2rem] text-text-dark-color mt-4">
          For large clients, we're able to customize pricing and feature set to
          your use case. Please reach out to enterprise@deflection.ai to connect
          with our enterprise sales team.
        </p>
      ),
    },
    {
      question: "How does Deflection AI's pricing work?",
      answer: (
        <p className="tracking-wide text-sm sm:text-[1.25rem] sm:leading-[2rem] text-text-dark-color mt-4">
          Deflection AI's pricing is based on resolutions, not on a per-user basis. We
          offer a Starter Plan as well as custom pricing for enterprise-level
          needs.
        </p>
      ),
    },

    {
      question: "What is the billing threshold?",
      answer: (
        <p className="tracking-wide text-sm sm:text-[1.25rem] sm:leading-[2rem] text-text-dark-color mt-4">
          The billing threshold is the set amount at which your payment method
          will be automatically charged. This threshold is adjustable within
          your Deflection AI portal.
        </p>
      ),
    },
    {
      question: "How is my total usage calculated?",
      answer: (
        <p className="tracking-wide text-sm sm:text-[1.25rem] sm:leading-[2rem] text-text-dark-color mt-4">
          Your total usage is calculated based on resolutions made through
          Deflection AI. The total may include usage covered by free trials or other
          credits, affecting your monthly bill.
        </p>
      ),
    },
    {
      question: "Can I add new members to my account?",
      answer: (
        <p className="tracking-wide text-sm sm:text-[1.25rem] sm:leading-[2rem] text-text-dark-color mt-4">
          Yes, you can add new members to your account at any time. However,
          adding members does not impact your pricing, which is based on
          resolutions.
        </p>
      ),
    },

    {
      question: "Are there any discounts available?",
      answer: (
        <p className="tracking-wide text-sm sm:text-[1.25rem] sm:leading-[2rem] text-text-dark-color mt-4">
          You can get $200 in free credits today as part of our promotional
          offer.
        </p>
      ),
    },
    {
      question: "Is the usage data real-time?",
      answer: (
        <p className="tracking-wide text-sm sm:text-[1.25rem] sm:leading-[2rem] text-text-dark-color mt-4">
          All usage data is UTC-based and may be delayed up to 24 hours.
        </p>
      ),
    },
  ];
  return (
    <div className="bg-white pt-5 px-5 sm:px-[200px] sm:pt-8 sm:ml-[40px] sm:pb-4 py-0 sm:py-8 ">
      <h2 class="block !font-[700] text-2xl md:text-[38px]   text-left my-[1rem] md:my-8 relative text-heading md:leading-[3rem]">
        Frequently Asked Questions{" "}
      </h2>
      {questions.map((ele, key) => (
        <div key={key}>
          <p className=" sm:mt-8 mt-2 sm:text-xl text-[15px] w-full font-semibold">
            {ele.question}
          </p>
          <p>{ele.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default Newfaq;
