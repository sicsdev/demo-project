"use client"
import React, { useState, useEffect } from "react";
import { createClient } from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import Link from "next/link";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { elements } from "chart.js";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import data from "./blog.json";

const client = createClient({
    space: "i1xiyapirlpi",
    accessToken: "FgLM4I4Od3JmUNYOYds-_SamHUOpOZSDR9T-6x_R_uE",
});


export const page = () => {
    const params = useSearchParams()
    const route = useRouter();
    const [blog, setBlog] = useState(null);
    const [heading, setHeading] = useState(null);
    const [date, setDate] = useState('');
    const [lastUpdate, setLastUpdate] = useState('');
  const [loading, setLoading] = useState(true);

  const findFilters =async()=>{
    let slug = params.get("article")
    if (slug) {
        const findData = data.find((x) => x.slug === slug)
        console.log("findData",findData)
        console.log("slug", slug)
        const entry = await client.getEntry(findData.id);
        console.log("entry.items", entry)
        setBlog(entry?.fields?.blogBody);
        setHeading(entry?.fields?.heading)
        setDate(entry?.fields?.dateAndTimeTest)
        setLastUpdate(entry?.sys?.updatedAt)
        sekeletonData()
    }
  }

    useEffect( () => {
      findFilters()
    }, []);

    const options = {
        renderNode: {
            'embedded-asset-block': (node) => {
                const { title, file } = node.data.target.fields;
                const imageUrl = file.url;
                const altText = title || '';
                return <img src={imageUrl} />;
            },
            'heading-2': (node, children) => {
                const id = node.content[0].value.replace(/\s+/g, '-').toLowerCase();
                return <h2 id={id}>{children}</h2>;
            },
            'paragraph': (node, children) => {
                return <p>{children}</p>;
            },
            'table': (node, children) => {
                return <table className="border border-2 border-md rounded w-1/2 divide-y divide-gray-200 mt-4 mb-4">{children}</table>;
            },
            'table-row': (node, children) => {
                return <tr>{children}</tr>;
            },
            'table-header-cell': (node, children) => {
                return <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{children}</th>;
            },
            'table-cell': (node, children) => {
                return <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{children}</td>;
            },
        },
    };


    const image = documentToReactComponents(blog, options);
    const value = image?.filter((x) => x.type === "h2")

    const sekeletonData = () => {
        setTimeout(() => {
          setLoading(false);
        }, 800);
      };

    const scroll = (e) => {
        console.log("scroll", e.target.innerText);
        const id = e.target.innerText.replace(/\s+/g, '-').toLowerCase();
        // route.push(`/resources/contentful/?id=${id}`)
        const element = document.getElementById(id);
        if (element) {
            const rect = element.getBoundingClientRect();
            const top = rect.top + window.scrollY - 150;  // margin from top to avoid navbar over title.
            window.scrollTo({ top: top, behavior: 'smooth' });
        }
    };

    return (
        <>
   <div className="bg-white  px-[20px] sm:px-0   ">
   <div className=" sm:p-[1rem] pt-6 sm:pt-6 mx-auto max-w-[90%] sm:max-w-[90%]">
        <div className="shadow-lg rounded-2xl">
          <p className="flex justify-center text-[20px]"> <span className="text-[#ff5721] font-semibold"> TEMPO  &nbsp; </span> <span className=""><i class="fa fa-angle-right" aria-hidden="true"></i></span> &nbsp; BLOG</p>
          <p className=" flex sm:text-[40px] text-[20px] pt-2 m-[auto] font-bold justify-center text-center">
           {heading}
          </p>
          <p className="flex justify-center pb-4 m-[0] font-semibold text-[15px] text-[#80808091] mb-[20px] ">August 14,2023 . 6 min to read</p>
        </div>
      </div>
      <div className="block sm:flex md:flex lg:flex justify-between items-start gap-10 lg:max-w-[1450px] m-auto">
      <div className="hidden sm:block w-[15%] sticky top-0">
        <div className="p-12 sm:mt-[5rem]">
          <div class="stick-right">
          {loading ? (
                <SkeletonLoader count={1} height={200} width="100%" />
              ) : ( <div className="rounded-[20px] bg-[#09162A]  shadow-2xl w-full sm:w-[243px] sm:p-[27px]">
              <p className="text-[20px] text-[white] sm:mb-3 font-semibold text-center">
              {loading ? (
                <SkeletonLoader count={1} height={30} width="100%" />
              ) : (
                "See how it works with Tempo Chat"  
              )}
              </p>
              <div className="block text-center">
                <div className="grid grid-cols-1 sm:grid-cols-1  gap-[14px] mt-8 sm:mt-0">
                  <div className="block sm:flex justify-center w-[100%] items-center gap-8">
                  {loading ? (
                    <SkeletonLoader count={1} height={30} width={100} />
                  ) : (
                    <button
                      className={
                        "inline-block font-semibold  rounded-lg bg-white px-6 pb-2 pt-2  leading-normal text-primary hover:text-white hover:bg-primary  disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a] text-[16px]" 
                      }
                    >
                      Get demo
                    </button>
                  )}
                  </div>
                  <div className="block sm:flex justify-center w-[100%] items-center gap-8">
                  {loading ? (
                    <SkeletonLoader count={1} height={30} width={100} />
                  ) : (
                    <button
                      className={
                        "inline-block font-semibold  rounded-lg bg-white px-6 pb-2 pt-2   leading-normal text-[#FF5721] hover:text-white hover:bg-[#FF5721]  disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#ff57215e] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a] text-[16px]" 
                      }
                    >
                      Get Started
                    </button>
                  )}
                  </div>
                </div>
              </div>
            </div>)}
            
       
          </div>
          </div>
        </div>
        <div className="sm:w-[60%] px-28">
            
        <div className="contentful-wrapper">{image}</div>
        </div>
        <div className="hidden sm:block w-[25%] sticky top-0">
          <div
            style={{
              width: "18rem",
              marginTop: "135px",
              marginBottom: "50px",
            }}
            className=" mt-[30px]"
          >
          <p className="p-[8px] text-[14px]">TABLE OF CONTENTS</p>
            <div className="font-medium SideOptions"    style={{
              borderLeft: "solid 1px"}}>
              
              {value?.map((ele, key) =>
                    <div className="btn cursor-pointer" key={key} >
                        <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-[13px] text-[#696a85] w-[14rem]" onClick={(e) => scroll(e)}>{ele?.props?.children[0]}</p>
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
        </>
    );

};

export default page;