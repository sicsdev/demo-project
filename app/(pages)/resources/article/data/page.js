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
import data from "./article.json";

const client = createClient({
  space: "i1xiyapirlpi",
  accessToken: "FgLM4I4Od3JmUNYOYds-_SamHUOpOZSDR9T-6x_R_uE",
});


const Page = () => {

  const params = useSearchParams()
  const route = useRouter();
  const [article, setArticle] = useState(null);
  const [heading, setHeading] = useState(null);
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [tag, setTag] = useState([]);
  const [lastUpdate, setLastUpdate] = useState('');
  const [related, setRelated] = useState([])
  let slug = params.get("article")


  const getSingleArticle = async () => {
    if (slug) {
      const findData = data.find((x) => x.slug === slug)
      const entry = await client.getEntry(findData.id);
      console.log("object, entry", entry);
      setArticle(entry?.fields?.articleBody);
      setHeading(entry?.fields?.heading)
      setDate(entry?.fields?.dateAndTimeTest)
      setLastUpdate(entry?.sys?.updatedAt)
      getRelatedArticles(entry?.fields?.tag, entry?.fields?.heading)
    }
  }

  const getRelatedArticles = async (tag, heading) => {
    const entry = await client.getEntries({
      content_type: "articles",
      order: "sys.id",
    });

    setRelated(entry.items)
    findTag(entry.items, tag, heading)
  }

  const findTag = (articles, tag, heading) => {
    if (article != "") {
      const findRelated = articles.filter((x) => x.fields.tag == tag);
      const findAllRelated = findRelated.filter((x) => x.fields.heading !== heading );
      console.log("find", findAllRelated)
      setTag(findAllRelated);
    }
    sekeletonData();
  }

  useEffect(() => {
    getSingleArticle();
  }, [slug]);

  const options = {
    renderNode: {
      'embedded-asset-block': (node) => {
        const { title, file } = node.data.target.fields;
        const imageUrl = file.url;
        const altText = title || '';
        return <img src={imageUrl} className="flex justify-center m-[auto] mt-[3rem] mb-[3rem]" />;
      },
      'heading-2': (node, children) => {
        const id = node.content[0].value.replace(/\s+/g, '-').toLowerCase();
        return <h2 id={id}>{children}</h2>;
      },
      'paragraph': (node, children) => {
        return <p>{children}</p>;
      },
      'table': (node, children) => {
        return <table className=" rounded w-1/2 divide-y divide-gray-200 mt-4 mb-4 m-[auto] shadow-lg">{children}</table>;
      },
      'table-row': (node, children) => {
        return <tr>{children}</tr>;
      },
      'table-header-cell': (node, children) => {
        return <th class="sm:px-6 py-1 bg-[#09162A] text-white rounded-tl-lg text-center sm:pr-16 ">{children}</th>;
      },
      'table-cell': (node, children) => {
        return <td class="px-4 sm:px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white sm:pr-16">{children}</td>;
      }
    },
  };
  const sekeletonData = () => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  const image = documentToReactComponents(article, options);
  const value = image?.filter((x) => x.type === "h2")

  const scroll = (e) => {
    const id = e.target.innerText.replace(/\s+/g, '-').toLowerCase();
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

  return (
    <div>   <div className="bg-white  px-[20px] sm:px-0   ">
      <div className=" sm:p-[1rem] pt-6 sm:pt-6 mx-auto max-w-[90%] sm:max-w-[90%]">
        {loading ? <SkeletonLoader className="sm:h-[200px] sm:w-[100px]" /> : <div className="shadow-lg rounded-2xl">
          <p className="flex justify-center text-[20px]"> <span className="text-[#ff5721] font-semibold"> TEMPO  &nbsp; </span> <span className=""><i class="fa fa-angle-right" aria-hidden="true"></i></span> &nbsp; ARTICLE</p>
          <p className=" flex sm:text-[40px] text-[20px] pt-2 m-[auto] font-bold justify-center text-center">
            {heading}
          </p>
          <p className="flex justify-center pb-4 m-[0] font-semibold text-[15px] text-[#80808091] mb-[20px] ">August 14,2023 . 6 min to read</p>
        </div>}
      </div>
      <div className="block sm:flex md:flex lg:flex justify-between items-start gap-10 lg:max-w-[1450px] m-auto">
        <div className="hidden sm:block w-[15%] sticky top-0">
          <div className="p-12 sm:mt-[5rem]">
            <div class="stick-right ">
              {loading ? (
                <SkeletonLoader count={1} height={30} width="100%" />
              ) : (<div className="rounded-[20px] bg-[#09162A]  shadow-2xl w-full sm:w-[243px] sm:p-[27px]">
                <p className="text-[20px] text-[white] sm:mb-3 font-semibold text-center">
                  {loading ? (
                    <SkeletonLoader count={1} height={30} width="100%" />
                  ) : (
                    "See how it works with Tempo Chat"
                  )}
                </p>
                <div className="block text-center  ">
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
          {loading ? <SkeletonLoader className="sm:h-[500px] sm:w-[600px]" /> : <div className="contentful-wrapper">{image}</div>}
        </div>
        <div className="hidden sm:block w-[25%] sticky top-0">
          {loading ? <SkeletonLoader className="sm:h-[200px] sm:w-[80px]" /> : <div
            style={{
              borderLeft: "solid 1px",
              width: "18rem",
              marginTop: "135px",
              marginBottom: "50px",
            }}
            className=" mt-[30px]"
          >

            <div className="font-medium SideOptions">
              {value?.map((ele, key) =>
                <div className="btn cursor-pointer" key={key} >
                  <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-[13px] text-[#696a85] w-[14rem]" onClick={(e) => scroll(e)}>{ele?.props?.children[0]}</p>
                </div>
              )}
            </div>
          </div>}

        </div>
      </div>
      <div className="mt-[60px]">
        {loading ? <SkeletonLoader className="sm:h-[50px] sm:w-[20px]" /> : <h1
          className="mt-2.5 mb-5 font-bold  text-2xl   md:text-h4 lg:text-h3 sm:text-h4 sm:leading-none flex justify-center"
        >
          Related Articles
        </h1>}

        <div className=" mb-[25px] grid grid-cols-3 gap-[3rem] p-[5rem]">

          {tag?.slice(0, 3)?.map((ele, key) => (
            <>
              {" "}
              {loading ?
                <div className="contents">
                  <SkeletonLoader className="sm:h-[50px] sm:w-[80px] " />
                </div>
                : <div className=" shadow-lg rounded-lg  p-5 sm:p-3" key={key}>
                  <Link href={`/resources/article/data?article=${removeSpacesAndHyphens(ele.fields.heading.toLowerCase())}`}>
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

    </div>

  )
};

export default Page;