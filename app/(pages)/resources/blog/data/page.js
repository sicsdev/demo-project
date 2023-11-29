"use client"
import React, { useState, useEffect } from "react";
import { createClient } from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import Link from "next/link";
import Image from "next/image";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { elements } from "chart.js";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import data from "./blog.json";

const client = createClient({
  space: "i1xiyapirlpi",
  accessToken: "FgLM4I4Od3JmUNYOYds-_SamHUOpOZSDR9T-6x_R_uE",
});

const Page = () => {
  const params = useSearchParams()
  const route = useRouter();
  const [blog, setBlog] = useState(null);
  const [heading, setHeading] = useState(null);
  const [date, setDate] = useState('');
  const [lastUpdate, setLastUpdate] = useState('');
  const [tag, setTag] = useState([]);
  const [related, setRelated] = useState([])
  const [currentImage, setCurrentimage] = useState("")
  const [loading, setLoading] = useState(true);
  const [pubDate, setPubdate] = useState("")
  let slug = params.get("blog")
  const findFilters = async () => {
    let slug = params.get("article");
    if (slug) {
      const findData = data.find((x) => x.slug === slug)
      console.log("findData", findData)
      console.log("slug", slug)
      const entry = await client.getEntry(findData?.id);
      console.log("entry.items", entry)
      setPubdate(findData?.publishDate);
      setBlog(entry?.fields?.blogBody);
      setHeading(entry?.fields?.heading)
      setCurrentimage(entry?.fields?.previewImage?.fields?.file?.url)
      setDate(entry?.fields?.dateAndTimeTest)
      setLastUpdate(entry?.sys?.updatedAt)
      getRelatedBlogs(entry?.fields?.tag, entry?.fields?.heading)
      sekeletonData()
    }
  }
  const getRelatedBlogs = async (tag, heading) => {
    const entry = await client.getEntries({
      content_type: "blogs",
      order: "sys.id",
    });
    console.log("entry", entry.items);
    setRelated(entry.items)

    findTag(entry.items, tag, heading)
  }
  const findTag = (blogs, tag, heading) => {
    if (blog != "") {
      const findRelated = blogs.filter((x) => x.fields.tag == tag);
      const findAllRelated = findRelated.filter((x) => x.fields.heading !== heading);
      console.log("find", findAllRelated)
      setTag(findAllRelated);
    }
  }
  useEffect(() => {
    findFilters();
    publishDates();
  }, [slug]);
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
        return <h2 id={id} className="sm:text-[23px]">{children}</h2>;
      },
      'paragraph': (node, children) => {
        return <p className="mt-[20px] mb-[20px]">{children}</p>;
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
  
  const removeSpacesAndHyphens = (slug) => {
    if (slug) {
      return slug?.replace(/\s+/g, "-");
    }
  };


const publishDates =()=>{
  function generateDateArray(startDate, endDate, step) {
    const dateArray = [];
    let currentDate = new Date(startDate);
  
    while (currentDate <= endDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + step);
    }
  
    return dateArray;
  }
  
  const startDate = new Date('2023-06-01');
  const endDate = new Date('2023-12-31');
  const step = 4;
  
  const resultArray = generateDateArray(startDate, endDate, step);
  
  console.log(resultArray);
}


  return (
    <>
      <div className="bg-white  px-[20px] sm:px-0   ">
        <div className=" sm:p-[1rem] pt-6 sm:pt-6 mx-auto max-w-[95%] sm:max-w-[95%]">
          <div className="shadow-lg rounded-2xl">
            <p className="flex justify-center text-[16px] sm:text-[20px]"> <span className="text-[#ff5721] font-semibold"> DEFLECTION AI  &nbsp; </span> <span className=""><i class="fa fa-angle-right" aria-hidden="true"></i></span> &nbsp; BLOG</p>
            <p className="sm:px-4 flex sm:text-[34px] sm:leading-[46px] text-[20px] pt-2 m-[auto] font-bold justify-center text-center">
              {heading}
            </p>
           
            <p className="flex justify-center pt-2 m-[0] font-semibold text-[15px] text-[#80808091]">{pubDate}  </p>
            <div className="flex justify-center sm:w-[100%] m-[auto] sm:h-[21rem] p-4">
              <Image
                fill={""}
                src=
                {currentImage}
                alt="img"
                className="bg-contain w-full rounded-md"
                style={{ objectFit: "cover" }}
                height={200}
                width={800}
              />
            </div>
          </div>
        </div>
        <div className="block sm:flex md:flex lg:flex justify-between items-start gap-10 lg:max-w-[1450px] m-auto">
          <div className="hidden sm:block w-[15%] sticky top-0">
            <div className="p-12 sm:mt-[3rem]">
              <div class="stick-right">
                {loading ? (
                  <SkeletonLoader count={1} height={200} width="100%" />
                ) : (<div className="rounded-[20px] bg-[#09162A]  shadow-2xl w-full sm:w-[243px] sm:p-[27px]">
                  <p className="text-[20px] text-[white] sm:mb-3 font-semibold text-center">
                    {loading ? (
                      <SkeletonLoader count={1} height={30} width="100%" />
                    ) : (
                      "See how it works with Deflection AI Chat"
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
                              "mb-4 sm:mb-0 py-[8px] rounded-sm px-2 w-full font-bold sm:w-[170px] focus:ring-yellow-300 text-black bg-[white] hover:bg-primary dark:focus:ring-yellow-900 "
                            }
                            data-cal-link="deflectionai/sales-call"
                            data-cal-config='{"layout":"month_view"}'
                          >
                            Schedule Demo
                          </button>
                        )}
                      </div>
                      <div className="block sm:flex justify-center w-[100%] items-center gap-8">
                        {loading ? (
                          <SkeletonLoader count={1} height={30} width={100} />
                        ) : (
                          <Link href={"/get-trial"}>
                            <button
                              className={
                                "mb-4 sm:mb-0 py-[8px] rounded-sm px-2 w-full font-bold sm:w-[170px] focus:ring-yellow-300 text-white hover:bg-[black] bg-primary dark:focus:ring-yellow-900 "
                              }
                            >
                              Get started free
                            </button></Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>)}


              </div>
            </div>
          </div>
          <div className="sm:w-[60%] sm:pl-20">

            <div className="contentful-wrapper">{image}</div>
          </div>
          <div className="hidden sm:block w-[25%] sticky top-0">
            <div
              style={{
                width: "18rem",
                marginBottom: "50px",
              }}
              className=" mt-[30px] sm:mt-[6rem]"
            >
              <p className="pl-[13px] text-[16px] font-bold text-[#fe5721]">TABLE OF CONTENTS</p>
              <div className="font-medium SideOptions"    >

                {value?.map((ele, key) =>
                  <div className="btn cursor-pointer" key={key} >
                    <p className="block pl-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-[16px] hover:font-bold text-[#696a85] w-[14rem]" onClick={(e) => scroll(e)}>{ele?.props?.children[0]}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
        <div className="sm:mt-[60px] pt-4 sm:pt-0">
          {loading ? <SkeletonLoader className="sm:h-[50px] sm:w-[20px]" /> : <h1
            className="mt-2.5 font-bold  text-2xl   md:text-h4 lg:text-h3 sm:text-h4 sm:leading-none flex justify-center"
          >
            Related Articles
          </h1>}

          <div className=" mb-[25px] sm:grid grid-cols-3 gap-[3rem] sm:p-[2rem] p-[0rem]">

            {tag?.slice(0, 3)?.map((ele, key) => (
              <>
                {" "}
                {loading ?
                  <div className="contents">
                    <SkeletonLoader className="sm:h-[50px] sm:w-[80px] " />
                  </div>
                  : <div className=" shadow-lg rounded-lg p-5" key={key}>
                    <Link href={`/resources/blog/data?article=${removeSpacesAndHyphens(ele.fields.heading.toLowerCase())}`}>
                      <div className="flex flex-co relative h-[200px] w-[100%] justify-start items-center js-show-on-scroll">
                        <Image
                          fill={true}
                          src=
                          {ele?.fields?.previewImage?.fields?.file?.url == undefined ? "/tempo-preview.png" : ele?.fields?.previewImage?.fields?.file?.url}

                          alt="img"
                          className="w-full h-full bg-contain"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="py-45 px-35">
                        <div>
                          <p className="flex justify-center font-semibold text-base sm:text-para my-4 opacity-80 js-show-on-scroll">
                            {ele.fields.heading}
                          </p>

                        </div>
                      </div>
                    </Link>
                  </div>}

              </>
            ))}
          </div>

        </div>
      </div>
    </>
  );

};

export default Page;