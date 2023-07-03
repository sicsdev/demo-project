export const price_data = [
  {
    title: "Starter",
    sub_title:
      "Maximize your power, speed, and flexibility to support your customers and team.",
    pricing_title: "CUSTOM",
    icons_svg: "/BuildingStorefront.svg",
    pricing_plan: "$74 / month",
    btn_title: "Get a demo",
    feature_title: "PRO KEY FEATURES, PLUS",
    feature_list: [
      // { title: "AI Chat", alert_icon: "" },
      // { title: "Smart Email Inbox", alert_icon: "" },
      // { title: "Pay-as-you-go Pricing", alert_icon: "" },
      // { title: "Intelligent IVR", alert_icon: "" },
      // { title: "Self-Service Portal", alert_icon: "" },
      { title: "Customizable chatbot", alert_icon: "" },
      { title: "Smart email responses", alert_icon: "" },
      { title: "24/7 shared support", alert_icon: "" },
    ],
  },
  {
    title: "Enterprise",
    sub_title:
      "Maximize your power, speed, and flexibility to support your customers and team.",
    pricing_title: "CUSTOM",
    icons_svg: "/BuildingOffice2.svg",

    pricing_plan: "$74 / month",
    btn_title: "Get a demo",
    feature_title: "STARTER KEY FEATURES, PLUS",
    feature_list: [
      // { title: "Customized Pricing", alert_icon: "" },
      // { title: "Priority Onboarding", alert_icon: "" },
      // { title: "Dedicated Account Manager", alert_icon: "" },
      // { title: "API Access", alert_icon: "" },

      { title: "Customizable chatbot", alert_icon: "" },
      { title: "Smart email responses", alert_icon: "" },
      { title: "White glove onboarding", alert_icon: "" },
      { title: "Dedicated account manager", alert_icon: "" },
      { title: "Early access to new features", alert_icon: "" },
    ],
  },
];
export const questions = [
  {
    question: "How does the free trial work?",
    answer: (
      <p className="tracking-wide text-sm text-text-dark-color">
        {" "}
        When you sign up for Tempo, you will have complete access to the Tempo
        suite of products. $200 in free credits are granted at sign up, and only
        after you exceed those will you be charged. There is no obligation,
        monthly fee, or any kind of recurring subscription.
      </p>
    ),
  },
  {
    question: "How does usage-based billing work?",
    answer: (
      <p className="tracking-wide text-sm text-text-dark-color">
        Users are billed 25¢ per system message for Tempo Chat, including the
        initial welcome, and any consecutive messages to idle customers. For
        Smart Inbox features, there is a 50¢ charge per email response. Please
        note that there are no limitations on response length. If a very long
        and complex email is required to resolve a query, it will still only
        cost you 50¢. All customers are enrolled in pay-as-you-go billing. For
        more information on payment thresholds, please <a style={{fontWeight:"600"}} href="/article/pricing-overview">click here.</a>
      </p>
    ),
  },
  {
    question: "How does enterprise pricing work?",
    answer: (
      <>
        <p className="tracking-wide text-sm text-text-dark-color">
          For large clients, we're able to customize pricing and feature set to
          your use case. Please reach out to enterprise@usetempo.ai to connect
          with our enterprise sales team.
        </p>
      </>
    ),
  },
];
