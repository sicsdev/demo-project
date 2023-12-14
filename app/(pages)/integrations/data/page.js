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
import { ArrowLongLeftIcon, BookOpenIcon } from "@heroicons/react/24/outline";

import data from "./integration.json"

const client = createClient({
    space: "i1xiyapirlpi",
    accessToken: "FgLM4I4Od3JmUNYOYds-_SamHUOpOZSDR9T-6x_R_uE",
});

const page = () => {
    const params = useSearchParams()
    const route = useRouter();
    const [headtext, setHeadtext] = useState(null);
    const [heading, setHeading] = useState(null);
    const [date, setDate] = useState('');
    const [lastUpdate, setLastUpdate] = useState('');
    const [tag, setTag] = useState([]);
    const [related, setRelated] = useState([])
    const [article, setArticle] = useState(null)


    const [currentImage, setCurrentimage] = useState("")

    const [loading, setLoading] = useState(true);
    let slug = params.get("article")

    const getSingleArticle = async () => {
        if (slug) {
            const findData = data.find((x) => x.slug === slug)
            const entry = await client.getEntry(findData?.id);
            console.log("object, entry", entry);
            setArticle(entry?.fields?.integrationBody);
            setHeading(entry?.fields?.heading)
            setCurrentimage(entry?.fields?.image?.fields?.file?.url)
            setHeadtext(entry?.fields?.headtext)
            //   setLastUpdate(entry?.sys?.updatedAt)
            getRelatedArticles(entry?.fields?.tag, entry?.fields?.heading)
        }
        sekeletonData();
    };

    const getRelatedArticles = async (tag, heading) => {
        const entry = await client.getEntries({
            content_type: "integrations",
            order: "sys.id",
        });

        setRelated(entry.items)

    }

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


    const image = documentToReactComponents(article, options);
    const value = image?.filter((x) => x.type === "h2")

    const sekeletonData = () => {
        setTimeout(() => {
            setLoading(false);
        }, 800);
    };
    useEffect(() => {
        getSingleArticle()
    }, []);
    console.log("loadd", loading);
    console.log("head", heading);
    console.log("art", article);

    return (
        <div className="w-full sm:w-[1440px] mx-auto" >
            <div className="bg-white sm:p-[120px]  p-2 text-center">
                <div className="grid grid-cols-1  sm:grid-cols-[75%_25%] ">
                    <div className=" flex flex-col">
                        <p className="text-[#ff5721] font-bold text-left">
                            {loading ? (
                                <SkeletonLoader count={1} height={20} width="70%" />
                            ) : (
                                `${heading} ${"Integration with Deflection AI"}`

                            )}   </p>
                        <h2 className="!font-bold text-h3 text-left">
                            {loading ? (
                                <SkeletonLoader count={1} height={60} width={140} />
                            ) : (<>
                                {heading}
                            </>
                            )}</h2>
                        <p className="text-[#363866] text-[26px] !font-semibold sm:mb-3 text-left">
                            {loading ? (
                                <SkeletonLoader count={2} height={20} width="100%" />
                            ) : (<>
                                { headtext }
                                </>
                            )}
                        </p>
                    </div>
                    <div className="flex  justify-center gap-[1rem] items-center flex-col sm:flex-row sm:gap-[80px] my-[21px] sm:my-0">

                        <div className="">
                            {loading ? (
                                <SkeletonLoader count={1} height={40} width={100} />
                            ) : (
                                <img src={currentImage} className="w-[120px] h-[120px]"></img>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white sm:py-[120px] p-2 sm:pt-0 text-center">
                <div className="grid grid-cols-1  sm:grid-cols-[75%_25%] ">
                    <div className="bg-[#f8f9fa!important]  sm:px-[120px]">
                        <div className="text-left sm:mt-7 p-[24px] sm:p-0">
                            {image}
                        </div>
                    </div>
                    <div className="p-12 bg-[#363744]">
                        <div class="stick-right ">


                            <div className="text-left">
                                {loading ? (
                                    <SkeletonLoader count={1} height={20} width="100%" />
                                ) : (
                                    <p className="flex gap-[1rem] text-[20px] font-semibold text-[white] justify-center">

                                        <span className="mt-[3px]"><BookOpenIcon class="h-6 w-6 text-gray-500" /></span><a href="/article/braintree-integration">Integration Guide</a></p>)}
                            </div>
                            <div className="rounded-[20px] bg-white  shadow-2xl w-full sm:w-[100%] sm:py-[56px]  mt-[2rem]">
                                <p className="text-[20px] text-[#363866] sm:mb-3 font-semibold">
                                    {loading ? (
                                        <SkeletonLoader count={1} height={20} width="100%" />
                                    ) : (
                                        "See how it works with Deflection AI"
                                    )}
                                </p>
                                <div className="block text-center  ">
                                    <div className="grid grid-cols-1 sm:grid-cols-1  gap-1 mt-8 sm:mt-0">
                                        <div className="block sm:grid justify-center w-[100%] items-center gap-4">
                                            {loading ? (
                                                <SkeletonLoader count={1} height={40} width={100} />
                                            ) : (
                                                <>
                                                <button
                                                className={
                                                  "mb-4 sm:mb-0 py-[8px] rounded-sm px-2 w-full font-bold sm:w-[170px] focus:ring-yellow-300 text-white bg-[black] hover:bg-primary dark:focus:ring-yellow-900 "
                                                }
                                                data-cal-link="deflectionai/sales-call"
                                                data-cal-config='{"layout":"month_view"}'   
                                              >
                                                Schedule Demo
                                              </button>
                                              <Link href={"/get-trial"}>
                            <button
                              className={
                                "mb-4 sm:mb-0 py-[8px] rounded-sm px-2 w-full font-bold sm:w-[170px] focus:ring-yellow-300 text-white hover:bg-[black] bg-primary dark:focus:ring-yellow-900 "
                              }
                            >
                              Get started free
                            </button></Link>
                                              </>
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
    )
}

export default page;