import React from "react";
import Link from "next/link";
const Footer = () => {
  const company = [
    "About",
    "Leadership",
    "Investors",
    "Careers",
    "Customers",
    "Partners",
    "Events",
    "Blogs",
    "News",
    "Contact",
  ];
  const support = [
    "Support",
    "Training & Certification",
    "Services",
    "Student Academy",
    "Community",
  ];
  const products = [
    "What’s New",
    "Temposervice",
    "Tempodesk",
    "Tempochat",
    "Temposales",
    "Tempomarketer",
    "Tempoworks Neo",
  ];

  return (
    <>
      <footer className=" bg-[#142543] shadow text-center text-white ">
        <div className=" mx-auto lg:max-w-[90%]">
          <div className="mx-6 py-10 text-center md:text-left  border-b-2 border-neutral-200 ">
            <div className="flex justify-between gap-3 flex-col items-start">
              <div>
                <h6
                  dangerouslySetInnerHTML={{
                    __html: `
             <a href="" onclick="Calendly.initPopupWidget({url: 'https://calendly.com/tempo-sales/30min'});return false;">
             <span className="underline cursor-pointer text-white">                            Schedule Demo

             </span>
             </a>
            `,
                  }}
                  className="mb-4  text-white   font-bold cursor-pointer border-2 p-2 rounded-lg   border-gray-50 text-xl bg-transparent  hover:bg-white hover:text-black hover:border-black    py-1 px-2 "
                ></h6>
              </div>
              <div>
                <h6 className="  text-white   font-bold cursor-pointer btext-xl bg-transparent  hover:bg-white hover:text-black hover:border-black    py-1 px-2 ">
              <Link href='/login'>
                  Login
                  </Link>
                </h6>
              </div>
              <div className="flex">
                {/* <a href="#!" className="mr-6 text-white dark:text-neutral-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>

                <a href="#!" className="mr-6 text-white dark:text-neutral-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a> */}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center gap-4 bg-slate-950 shadow  p-6 text-center dark:bg-neutral-700">
            <span className="text-4xl">
              {/* <Link href="/"> */}
                <img
                  src="/logo.png"
                  alt="logo"
                  className="w-24 h-15 object-contain"
                />
              {/* </Link> */}
            </span>
            <a
              className="font-thin text-neutral-600 dark:text-neutral-400 "
              href="https://tailwind-elements.com/"
            >
              © Tempo AI Ventures, LLC{" "}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
