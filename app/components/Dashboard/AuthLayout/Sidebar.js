"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../store/slices/userSlice";
import Cookies from "js-cookie";
import { uploadLOgo } from "@/app/API/pages/Bot";
import {
  ArrowDownOnSquareIcon, BanknotesIcon, BriefcaseIcon,
  ShareIcon,
  WrenchScrewdriverIcon,
  UserGroupIcon,
  HomeIcon,
  QuestionMarkCircleIcon, BuildingOffice2Icon, ChevronDownIcon, ChevronUpIcon, ClipboardIcon, CreditCardIcon, CurrencyDollarIcon, PresentationChartLineIcon
} from "@heroicons/react/24/solid";
const Sidebar = ({ children }) => {
  const state = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const defaultPhoto = "https://cdn-icons-png.flaticon.com/256/149/149071.png";
  const [base64Data, setBase64Data] = useState({ data: "", state: false });
  const [showSubTabs, setShowSubTabs] = useState(null);

  useEffect(() => {
    if (!state) {
      console.log("ccc");
      dispatch(fetchProfile());
    }
  }, [state]);

  useEffect(() => {
    if (base64Data.state == true) {
      dispatch(fetchProfile());
      setTimeout(() => {
        dispatch(fetchProfile());
      }, [2000]);
      setTimeout(() => {
        setBase64Data({ state: false });
      }, [4000]);
    }
  }, [base64Data]);
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("Token");
    clearCookies();
    window.location.href = "/";
  };

  const clearCookies = () => {
    const cookies = Cookies.get();
    Object.keys(cookies).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
  };

  const SideBarRoutes = [
    {
      href: "/dashboard",
      name: "Home",
      icon: <HomeIcon className="h-6 w-6 text-gray-500" />,
      list: []
    },
    {
      href: "/dashboard/members",
      name: "Members",
      icon: <UserGroupIcon className="h-6 w-6 text-gray-500" />,
      list: []
    },
    {
      href: "/dashboard/billing/usage",
      name: "Billing",
      icon: <BanknotesIcon className="h-6 w-6 text-gray-500" />,
      list: [
        {
          href: "/dashboard/billing/usage",
          name: "Usage",
          icon: <ArrowDownOnSquareIcon className="h-6 w-6 text-gray-500" />,
        },
        {
          href: "/dashboard/billing/daily-limit",
          name: "Daily Limit",
          icon: <CurrencyDollarIcon className="h-6 w-6 text-gray-500" />,
        },
        {
          href: "/dashboard/billing/payment-methods",
          name: "Payment Methods",
          icon: <CreditCardIcon className="h-6 w-6 text-gray-500" />,
        },
        {
          href: "/dashboard/billing/settings",
          name: "Billing Settings",
          icon: <WrenchScrewdriverIcon className="h-6 w-6 text-gray-500" />,
          list: []
        },
      ]
    },
    {
      href: "/dashboard/workflow/integrations",
      name: "Workflows",
      icon: <PresentationChartLineIcon  className="h-6 w-6 text-gray-500" />,
      list: [
        {
          href: "/dashboard/workflow/integrations",
          name: "Integrations",
          icon: <ShareIcon className="h-6 w-6 text-gray-500" />
        },
        {
          href: "/dashboard/workflow/policies",
          name: "Policies",
          icon: <ClipboardIcon className="h-6 w-6 text-gray-500" />
        },
        {
          href: "/dashboard/workflow/workflow-builder",
          name: "WorkFlow Builder",
          icon: <BriefcaseIcon className="h-6 w-6 text-gray-500" />
        },
      ]
    },
  ];

  const divRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Content = reader.result;
      uploadLOgo({ logo: base64Content });
      setBase64Data({ data: base64Content, state: true });
      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    };

    reader.readAsDataURL(file);
  };

  const sendSideBarDetails = (element, key) => {
    if (element.list.length > 0) {
      return <li key={key}>
        <Link
          href={element.href}
          onClick={() => { setShowSubTabs(prev => { if (prev === key) { return null } return key }) }}
          className={` flex items-center p-2 text-gray-900 rounded-lg hover:bg-linkhover`}
        >
          {element.icon}
          <span className="flex justify-between w-full ml-4 whitespace-nowrap text-sm font-normal">
            {element.name}
          </span>
        </Link>
        {showSubTabs === key && (
          <ul className="p-3 space-y-2">
            {element.list.map((ele, key) =>
              <li key={key}>
                <Link
                  href={ele.href}
                  className={`${pathname === ele.href && "bg-linkhover"
                    } flex items-center p-2 text-gray-900 rounded-lg hover:bg-linkhover`}
                >
                  {ele.icon}
                  <span className="flex justify-between w-full ml-3 whitespace-nowrap text-sm font-normal">
                    {ele.name}
                  </span>
                </Link>
              </li>
            )}
          </ul>
        )}
      </li>
    }
    return <li key={key}>
      <Link
        href={element.href}
        className={`${pathname === element.href && "bg-linkhover"
          } flex items-center p-2 text-gray-900 rounded-lg hover:bg-linkhover`}
      >
        {element.icon}
        <span className="flex ml-3 whitespace-nowrap text-sm font-normal">
          {element.name}

        </span>
      </Link>
    </li>
  }
  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-sidebar">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between text-white    ">
            <div className="flex items-center justify-start">
              <button
                onClick={() => setShow((prev) => !prev)}
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>

              <Link href="/dashboard" className="flex ml-2 md:mr-24">
                <img
                  src="/logo.png"
                  alt="logo"
                  className="w-24 h-15 object-contain"
                />
              </Link>
            </div>
            <div className="flex items-center" ref={divRef}>
              <div className="flex items-center ml-3">
                <div className="relative">
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded={isOpen}
                    onClick={handleToggle}
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src={
                        state?.enterprise?.logo == null
                          ? defaultPhoto
                          : state?.enterprise?.logo
                      }
                      alt="user photo"
                    />
                  </button>

                  {isOpen && (
                    <ul className="absolute w-[200px] text-center right-0 mt-2 py-2 bg-white rounded shadow-lg">
                      <li className="text-start p-2">
                        <p className="text-sm text-heading ml-4">
                          {state?.email}
                        </p>
                      </li>

                      <hr className="text-border border-gray" />
                      {SideBarRoutes.map((element, key) => (
                        <li key={key}>
                          <Link
                            href={element.href}

                            className={` flex items-center p-2 text-heading  hover:bg-linkhover hover:text-white`}
                          >
                            {/* {element.icon} */}
                            <span className="flex justify-between w-full ml-4 whitespace-nowrap text-sm font-normal">
                              {element.name}
                            </span>
                          </Link>
                        </li>
                      ))}

                      <hr className="text-border border-gray" />
                      <li className="p-2 relative hover:underline flex">
                        <input
                          className="inline-block cursor-pointer  absolute top-0 left-[28px] opacity-0 rounded-full px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-[blue] shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                          id="multiple_files"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleFileInputChange(e)}
                        />
                        <label
                          className="inline-block ml-4 rounded-full text-xs font-medium uppercase   leading-normal text-heading "
                          for="file_input"
                        >
                          Upload logo
                        </label>
                      </li>

                      <li className="text-start p-2 ">
                        <button
                          type="button"
                          className="inline-block  rounded-full ml-4 text-heading"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>

                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {show && (
          <div
            className="block sm:hidden lg:hidden md:hidden items-center justify-between text-white  z-50 bg-sidebar   w-full md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="space-y-2 font-medium  w-full relative">
              {SideBarRoutes.map((element, key) => (
                sendSideBarDetails(element, key)
              ))}
              <li>
                <a
                  href={"mailto:team@usetempo.ai"}
                  className={` flex items-center p-2 text-gray-900 rounded-lg hover:bg-linkhover`}
                >
                  <span className="flex-1 ml-3 whitespace-nowrap text-sm font-normal">
                    Get Support
                  </span>
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed  top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-sidebar border-r border-gray-200 sm:translate-x-0 flex flex-col"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-sidebar  text-white">
          <ul className="space-y-2 font-medium  w-full relative">
            {SideBarRoutes.map((element, key) => sendSideBarDetails(element, key)
            )}

          </ul>
          <div className="absolute bottom-0 w-[90%] text-sm mb-5">
            <ul className="space-y-2 font-medium flex flex-col ">
              <li>
                <a
                  href={"mailto:team@usetempo.ai"}
                  className={` flex items-center p-2 text-gray-900 rounded-lg hover:bg-linkhover`}
                >
                  <QuestionMarkCircleIcon className="h-6 w-6 text-gray-500" />
                  <span className="flex-1 ml-3 whitespace-nowrap text-sm font-normal">
                    Get Support
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <div className="sm:p-4 md:p-4 lg:p-4 sm:ml-64 ">
        <div className="p-4  rounded-lg dark:border-gray-700 mt-14">
          {children}
        </div>
      </div>
    </>
  );
};
export default Sidebar;
