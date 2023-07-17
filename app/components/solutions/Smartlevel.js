import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./newaccordian.css";

const Smartlevel = () => {
  const tabs = [
    {
      id: "1",
      title: "Tasks",
      content_video: "/tabs/smartinbox2.gif",
      p: "Create tasks in multiple work streams without duplicating the task itself. This way, your task is easily accessible to multiple departments, but can be uniquely tracked for your team’s specific purposes.",
    },
    {
      id: "2",
      title: "Subtasks",
      content_video: "/tabs/Analytics-Gif.gif",
      p: "Let’s say you are asked to approve an event budget. The overall task may be the event itself, but the budget subtask is the only one that’s relevant to you. Simply cross-tag that subtask into your folder and it will show up in your weekly report..",
    },

    {
      id: "3",
      title: "Folders",
      content_video: "/tabs/three.gif",
      p: "With Wrike, a single folder can live in multiple places. For example, a “Marketing Campaign” folder can be cross-tagged into your marketing team’s quarterly folder, as well as the lead generation team’s designated Space.",
    },
    {
      id: "4",
      title: "Milestone",
      content_video: "/tabs/Billing-GIF.gif",
      p: "Cross-tagging is also useful when it comes to tracking departmental milestones. For example, a milestone task can exist in a marketing department’s folder, but it can also be included in a report on PMO milestones.",
    },
  ];
  return (
    <div className="bg-white">
      <div className=" mx-auto max-w-[90%] sm:max-w-[90%]   py-10">
        <div className="sm:max-w-[100%] w-full">
          {/* <h6 class="font-bold text-xl black py-1 text-primary">Pricing</h6> */}
          <h1 class="text-2xl  tracking-wide text-center text-heading sm:text-3xl md:text-4xl lg:text-4xl my-2 font-bold ">
            Cross-tag at every level
          </h1>
          <p className="sm:mt-8 sm:mb-3 mb-3 text-justify">
            Categorize your company’s entire workload with Wrike. Use our
            cross-tagging feature across tasks, subtasks, folders, milestones,
            phases, and projects.
          </p>
        </div>
        <div className=" flex flex-col sm:grid sm:grid-cols-2 justify-evenly items-center gap-10">
          <div className="">
            <div className="faq-accordian js-show-on-scroll">
              <Accordion allowZeroExpanded>
                {tabs.map((element, key) => (
                  <AccordionItem key={key}>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        <h3 className="text-heading tracking-wider text-lg sm:text-xl md:text-xl lg:text-xl font-semibold">
                          {" "}
                          {element.title}
                        </h3>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>{element.p}</AccordionItemPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
          <div className=" sm:w-[80%] sm:mt-5">
            <div className="w-full  mt-[40px] sm:mt-0">
              <div className="h-[100%]  mb-6 sm:mb-0">
                <img
                  src="/aw.avif"
                  className="w-full sm:h-[354px] m-auto shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Smartlevel;
