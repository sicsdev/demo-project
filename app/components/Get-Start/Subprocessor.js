import React from "react";
const Subprocessor = () => {
  const data = [
    "Entity Name",
    "Purpose of Processing    ",
    "Location(s) of processing    ",
    "More Information",
  ];

  const subprocessors = [
    {
        
      name: "Open AI",
      processing: "Artificial Intelligence Models",
      location: "United States",
      url: "https://openai.com/",
    },
    {
      name: "AWS",
      processing: "Cloud Hosting",
      location: "United States",
      url: "https://aws.amazon.com/",
    },
    {
      name: "Mailgun",
      processing: "Email Hosting",
      location: "United States",
      url: "https://www.mailgun.com/",
    },
    {
      name: "Twilio	",
      processing: "Voice and SMS Hosting",
      location: "United States	",
      url: "https://www.twilio.com/",
    },
    {
        name: "Sentry.io 	",
        processing: "Error Logging",
        location: "United States	",
        url: "https://sentry.io/",
      },
      {
        name: "New Relic 	",
        processing: "- Data Observability",
        location: "United States	",
        url: "https://newrelic.com/",
      },
      {
        name: "SendGrid	",
        processing: "Email and SMS Sending",
        location: "United States",
        url: "https://sendgrid.com/",
      },
      {
         name:"Vercel",
          processing:"Content Delivery Network",
          location:"United States",
          url:"https://vercel.com/"

      }
  ];
  return (
    <>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg hidden md:block">
        <table class=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {data.map((ele, key)=>
              <th scope="col" class="px-6 py-3" key={key}>
             {ele}
             </th>
              )}
              
             
            </tr>
          </thead>
          <tbody>
            {subprocessors.map((ele,key)=>
               <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
               <th
                 scope="row"
                 class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
               >
                {ele.name}
               </th>
               <td class="px-6 py-4">{ele.processing}</td>
               <td class="px-6 py-4">{ele.location}</td>
               <td class="px-6 py-4">
                 <a
                   href="#"
                   class="font-medium text-[blue] dark:text-blue-500 hover:underline"
                 >
                 {ele.url}
                 </a>
               </td>
             </tr>
            )}
         
         
          </tbody>
        </table>
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg block md:hidden  ">
        <div className="block sm:grid md:grid lg:grid grid-cols-2 gap-4">
          <div className="pl-6 pr-6">
            {data.map((ele, key) => (
              <p className="text-heading font-semibold" key={key}>
                {ele}
              </p>
            ))}
          </div>
          {subprocessors.map((ele, key) => (
            <div className="pl-6 pr-6 pb-6 pt-4" key={key}>
              <p className="text-heading ">{ele.name}</p>
              <p className="text-heading ">{ele.processing}</p>
              <p className="text-heading ">{ele.location}</p>
              <p className="text-[blue] ">{ele.url}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Subprocessor;
