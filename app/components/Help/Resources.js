"use client"
import React, { useState, useEffect } from 'react';
import { createClient } from "contentful";
import Link from 'next/link';
import { ArrowRightIcon, ArrowDownRightIcon } from "@heroicons/react/24/outline";
import Image from 'next/image';
import HomeComponent from '@/app/components/Home/HomeComponent';

const client = createClient({
    space: "i1xiyapirlpi",
    accessToken: "FgLM4I4Od3JmUNYOYds-_SamHUOpOZSDR9T-6x_R_uE",
});


const categories = [{
    id: 1,
    name: "All Resources"
}, {
    id: 2,
    name: "Articles"
}, {
    id: 3,
    name: "Integrations"
},]

const Resources = () => {
    const [All, setAll] = useState("All Resources");
    const [showAllArticles, setShowAllArticles] = useState([]);
    const [showAllIntegrations, setShowAllIntegrations] = useState([]);
    const [delay, setDelay] = useState(false);

    useEffect(() => {
        getAllData();
        getAllIntegrations();
        getAllArticles()
    }, [])

    const getAllData = () => {
        client.getContentTypes()
            .then((response) => {
                console.log(response)
                setShowAllArticles(response.items.filter((element) => element.name.toLowerCase() !== "blogs"))
            }
            )
            .catch(console.error);
    }

    const getAllIntegrations = async () => {
        const entry = await client.getEntries({
            content_type: "integrations",
            order: "sys.id",
        });
        setShowAllIntegrations(entry.items)
    }

    const getAllArticles = async () => {
        const entry = await client.getEntries({
            content_type: "articles",
            order: "sys.id",
        });        setShowAllArticles(entry.items);
    }

    const handleAllResources = (e) => {
        setDelay(true);
        setAll(e.target.innerText)
        setTimeout(() => {
            setDelay(false);
        }, 200);
    }

    const removeSpacesAndHyphens = (slug) => {
        if (slug) {
            return slug?.replace(/\s+/g, "-");
        }
    };

    return (
        <div className='mt-[2rem] sm:mt-[4rem]'>
            <div className='flex justify-center mb-[3rem] '>
                {categories?.map((ele, key) =>
                    <div key={key} className={All === ele.name ? 'cursor-[pointer] border-b-[3px] border-[#f5455c] pb-[8px] px-[22px] text-[14px] sm:text-base ' : 'cursor-[pointer]  pb-[8px] px-[22px] text-[14px] sm:text-base'} onClick={(e) => handleAllResources(e)}>
                        {ele.name}</div>
                )}
            </div>
            <div className='mb-[4rem] bg-[#8080804d]'>
                <div class={delay ? "opacity-0 " : "grid grid-cols-4 gap-8 p-[0px] sm:p-[2rem]"}>
                    {All == "All Resources" ? <>{showAllArticles?.map((ele, key) =>
                        <div className=" shadow-lg   p-5 sm:p-3 bg-[white]" key={key} >
                            <Link
                                href=
                                {`/resources/article/data?article=${removeSpacesAndHyphens(ele?.fields?.heading?.toLowerCase())}`}
                            >
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
                                <div className="p-[12px]">
                                    <div>
                                        <p className="flex  text-base sm:text-para my-4  js-show-on-scroll">
                                            {ele.sys.contentType?.sys?.id}

                                        </p>
                                        <p className="flex   text-base sm:text-para my-4  js-show-on-scroll">
                                            {ele.fields.heading}
                                        </p>

                                    </div>
                                    <div className='mt-[3rem] flex justify-end'>   <ArrowRightIcon className="h-6 w-6 text-gray-500" /></div>

                                </div>
                            </Link>
                        </div>
                    )}
                        {showAllIntegrations?.map((ele, key) =>

                            <div className="shadow-lg bg-[white]" key={key} >
                                <Link
                                    href=
                                    {`/integrations/data?article=${removeSpacesAndHyphens(ele.fields.heading.toLowerCase())}`}
                                >
                                    <div className="flex flex-co relative h-[200px] w-[100%] justify-start items-center js-show-on-scroll">
                                        <Image
                                            fill={true}
                                            src=
                                            {ele?.fields?.previewImage?.fields?.file?.url == undefined ? "/tempo-preview.png" : ele?.fields?.previewImage?.fields?.file?.url}

                                            alt="img"
                                            className="w-full h-full bg-contain"
                                            style={{ objectFit: "fill" }}
                                        />
                                    </div>
                                    <div className="p-[12px]">
                                        <div>
                                            <p className="flex  text-base sm:text-para my-4  js-show-on-scroll">
                                                {ele.sys.contentType.sys.id}

                                            </p>
                                            <p className="flex   text-base sm:text-para my-4  js-show-on-scroll">
                                                {ele.fields.heading}
                                            </p>
                                            <div className='mt-[3rem] flex justify-end'>   <ArrowRightIcon className="h-6 w-6 text-gray-500" /></div>

                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </> : ""}
                    {All === "Articles" ? <>{showAllArticles?.map((ele, key) =>

                        <div className=" shadow-lg   p-5 sm:p-3 bg-[white]" key={key} >
                            <Link
                                href=
                                {`/resources/article/data?article=${removeSpacesAndHyphens(ele?.fields?.heading?.toLowerCase())}`}
                            >
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
                                <div className="p-[12px]">
                                    <div>
                                        <p className="flex  text-base sm:text-para my-4  js-show-on-scroll">
                                            {ele.sys.contentType?.sys?.id}

                                        </p>
                                        <p className="flex   text-base sm:text-para my-4  js-show-on-scroll">
                                            {ele.fields.heading}
                                        </p>

                                    </div>
                                    <div className='mt-[3rem] flex justify-end'>   <ArrowRightIcon className="h-6 w-6 text-gray-500" /></div>

                                </div>
                            </Link>
                        </div>
                    )}</> : ""}
                    {All === "Integrations" ? <>{showAllIntegrations?.map((ele, key) =>

                        <div className=" shadow-lg    bg-[white]" key={key} >
                            <Link
                                href=
                                {`/integrations/data?article=${removeSpacesAndHyphens(ele.fields.heading.toLowerCase())}`}
                            >
                                <div className="flex flex-co relative h-[200px] w-[100%] justify-start items-center js-show-on-scroll">
                                    <Image
                                        fill={true}
                                        src=
                                        {ele?.fields?.previewImage?.fields?.file?.url == undefined ? "/tempo-preview.png" : ele?.fields?.previewImage?.fields?.file?.url}

                                        alt="img"
                                        className="w-full h-full bg-contain"
                                        style={{ objectFit: "fill" }}
                                    />
                                </div>
                                <div className="p-[12px]">
                                    <div>
                                        <p className="flex  text-base sm:text-para my-4  js-show-on-scroll">
                                            {ele.sys.contentType.sys.id}

                                        </p>
                                        <p className="flex   text-base sm:text-para my-4  js-show-on-scroll">
                                            {ele.fields.heading}
                                        </p>
                                        <div className='mt-[3rem] flex justify-end'>   <ArrowRightIcon className="h-6 w-6 text-gray-500" /></div>

                                    </div>
                                </div>
                            </Link>
                        </div>
                    )}</> : ""}

                </div>

            </div>
        </div>

    )
}

export default Resources;