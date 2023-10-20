"use client"
import React, { useEffect, useState } from "react";
import { ArrowLongLeftIcon,BookOpenIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";

const page = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
<div className="w-full sm:w-[1440px] mx-auto" >
    <div className="bg-white sm:p-[120px] sm:p-12 p-2 text-center">
      <div className="grid grid-cols-1  sm:grid-cols-[75%_25%] ">
            <div className=" flex flex-col ">
              <p className="text-[#ff5721] font-bold text-left">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="70%" />
              ) : (
   "           Microsoft Teams Integration with Tempo     "    
                   )}     </p>

              <h2 className="!font-bold text-h3 text-left">
              {loading ? (
                <SkeletonLoader count={1} height={60} width={140} />
              ) : (
                "Microsoft Teams"
               )} </h2>
                <p className="text-[#363866] !font-semibold sm:mb-3 text-[26px] text-left">
            {loading ? (
              <SkeletonLoader count={2} height={20} width="100%" />
            ) : (
            "Unify Your Communication and Collaboration with Real-Time Data Sync"
            )}
            </p>
            </div>
            <div className="flex  justify-center gap-[1rem] items-center flex-col sm:flex-row sm:gap-[80px]  my-[21px] sm:my-0">
            <div className="">
            {loading ? (
              <SkeletonLoader count={1} height={60} width={140} />
            ) : (
            <img src="/teams.png" className="w-[120px] h-[120px]"></img>
            )}
            </div>
          </div>
          </div>
          </div>
          <div className="bg-white sm:py-[120px] sm:py-12 p-2 sm:pt-0 text-center">
      <div className="grid grid-cols-1  sm:grid-cols-[75%_25%] ">
      <div className="bg-[#f8f9fa!important]  sm:px-[120px] sm:px-12">
          <div className="text-left sm:mt-7 p-[24px] sm:p-0">
           
            <p className="text-[#363866] !font-semibold sm:mb-3 text-[26px]">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
          "  Why Integrate Microsoft Teams with Tempo? "          
             )} </p>
            <p className="text-[#363866] !font-semibold sm:mb-3 text-xl">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            "Unified Workspace: "
                       )}           </p>
            <p className="text-heading text-xl">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
           " Manage Teams' chats, channels, and users directly from Tempo's unified dashboard. "
            )}
            </p>
            <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[30px] text-xl">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
       "     Enhanced Collaboration:    "        
            )}</p>
            <p className="text-heading text-xl">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            "Utilize Tempo's features to collaborate in real-time on Teams conversations, ensuring more effective teamwork."
            )}
            </p>
            <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[30px] text-xl">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
           " Data-Driven Insights:"            
            )}</p>
            <p className="text-heading text-xl">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
        "    Leverage Tempo's analytics to gain actionable insights from your Teams data, enabling smarter business decisions."
            )}
            </p>
            <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[30px] text-[26px]">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
              "How It Works"
            )}
            </p>
            <p className="text-[#363866]   sm:mt-[20px] text-xl mb-[1rem]">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (<>
              <span className="font-semibold"> Connect Microsoft Teams to Tempo:</span>Seamlessly integrate your Microsoft Teams account with Tempo in a few simple steps.  </>
            )}
            </p>
            {/* <p className="text-heading text-xl sm:mb-3">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
"            Seamlessly integrate your Microsoft Teams account with Tempo in a few simple steps.  "
                      )}          </p> */}
            <p className="text-[#363866]   text-xl mb-[1rem]">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (<>
              <span className="font-semibold"> Customize Your Collaboration Workflow with Teams Endpoints:</span>Incorporate Teams diverse API endpoints into your Tempo workflows for a tailored communication and collaboration experience.</>
            )}
            </p>
            {/* <p className="text-heading text-xl sm:mb-3">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
           " Incorporate Teams' diverse API endpoints into your Tempo workflows for a tailored communication and collaboration experience."
            )}
            </p> */}
            <p className="text-[#363866]  text-xl ">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (<>
              <span className="font-semibold"> Analyze and Optimize:</span> Use Tempo's analytics to derive valuable insights from your Teams data, driving continuous improvement.</>
            )}
            </p>
            {/* <p className="text-heading text-xl sm:mb-3">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            "Use Tempo's analytics to derive valuable insights from your Teams data, driving continuous improvement."
            )}
            </p> */}
            <div>
            {loading ? (
              <SkeletonLoader count={2} height={150} width="100%" />
            ) : (
              <img
                src="/integration_page/Microsoft_tab-1.png"
                className="w-[full] sm:[465px] sm:h-[465px]"
              />
            )}
            </div>
            <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[35px] text-xl">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
               "Features"
            )}
            </p>
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b> User Management: </b> Retrieve, create, update, and delete users in Microsoft Teams.
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b> Message Operations: </b>Manage messages in channels and chats, including sending, updating, and deleting messages.
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b> Channel and Team Operations:</b> Create, update, and manage channels and teams for enhanced collaboration.
            </p>)}
            <div>
            {loading ? (
              <SkeletonLoader count={2} height={150} width="100%" />
            ) : (
              <img
                src="/integration_page/Microsoft_tab2.png"
                className="w-[full] sm:[465px] sm:h-[465px]"
              />
            )}
            </div>
            <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[50px] text-xl">
            {loading ? (
              <SkeletonLoader count={2} height={150} width="100%" />
            ) : (
              "Get Started"
            )}
            </p>
            <p className="text-heading text-xl sm:mb-3">
            {loading ? (
              <SkeletonLoader count={2} height={150} width="100%" />
            ) : (
           " Ready to take your communication and collaboration to the next level? Integrate Microsoft Teams with Tempo today.    "        
            )}</p>
            <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[50px] text-xl">
            {loading ? (
              <SkeletonLoader count={2} height={150} width="100%" />
            ) : (
              "Integrate Now"
            )}
            </p>
          </div>

         
</div>
<div className="p-12 bg-[#363744]">
<div class="stick-right ">


<div className="text-left">
  {loading ? (
    <SkeletonLoader count={1} height={20} width="100%" />
  ) : (
    <p className="flex gap-[1rem] text-[20px] font-semibold text-[white] justify-center">

      <span className="mt-[3px]"><BookOpenIcon class="h-6 w-6 text-gray-500" /></span><a href="/article/microsoft-teams-integration">Integration Guide</a></p>)}
</div>
<div className="rounded-[20px] bg-white  shadow-2xl w-full sm:w-[100%] sm:py-[56px] sm:py-[30px] mt-[2rem]">
  <p className="text-[20px] text-[#363866] sm:mb-3 font-semibold">
    {loading ? (
      <SkeletonLoader count={1} height={20} width="100%" />
    ) : (
      "See how it works with Tempo AI"
    )}
  </p>
  <div className="block text-center  ">
    <div className="grid grid-cols-1 sm:grid-cols-1  gap-1 mt-8 sm:mt-0">
      <div className="block sm:flex justify-center w-[100%] items-center gap-8">
        {loading ? (
          <SkeletonLoader count={1} height={40} width={100} />
        ) : (
          <button
            className={
              "mb-4 sm:mb-0 uppercase py-[18px] px-2  font-bold w-[177px] focus:ring-yellow-300 text-white bg-[#FF5721] hover:bg-black dark:focus:ring-yellow-900 rounded-2xl"
            }
          >
            Get A demo
          </button>
        )}
      </div>
    </div>
  </div>
</div>
</div>
          </div>
      </div>
    </div>
    </div>

  );
};

export default page;
