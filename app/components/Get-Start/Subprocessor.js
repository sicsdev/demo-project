import React from "react";
const Subprocessor = () => {
  const data = [
    "Entity Name",
    "Purpose of Processing",
    "Location(s) of processing",
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
      processing: "Data Observability",
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
      name: "Vercel",
      processing: "Content Delivery Network",
      location: "United States",
      url: "https://vercel.com/",
    },
  ];
  return (
    <>
      <div className="relative overflow-x-auto sm:rounded-lg mx-6 sm:mx-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 m-auto shadow-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {data.map((ele, key) => (
                <th scope="col" className="px-3 sm:px-6 py-2 sm:py-4 bg-[#09162A] text-white" key={key}>
                  {ele}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subprocessors.map((ele, key) => (
              <tr className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" 
              style={{ borderBottom: "1px solid rgb(220 222 225 / 55%)" }}
              >
                <th
                  scope="row"
                  className="px-3 text-[14px] sm:px-6 py-2 sm:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {ele.name}
                </th>
                <td className="px-3 text-[14px] sm:px-6 py-2 sm:py-4">{ele.processing}</td>
                <td className="px-3 text-[14px] sm:px-6 py-2 sm:py-4">{ele.location}</td>
                <td className="px-3 text-[14px] sm:px-6 py-2 sm:py-4">
                  <a
                    href={ele.url}
                    className="font-medium text-[blue] dark:text-blue-500 hover:underline"
                  >
                    {ele.url}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Subprocessor;
