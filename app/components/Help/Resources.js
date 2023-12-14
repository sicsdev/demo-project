"use client"
import React, { useState, useEffect } from 'react';
import { createClient } from "contentful";
import Link from 'next/link';
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from 'next/image';
import HomeComponent from '@/app/components/Home/HomeComponent';

const client = createClient({
    space: "i1xiyapirlpi",
    accessToken: "FgLM4I4Od3JmUNYOYds-_SamHUOpOZSDR9T-6x_R_uE",
});

const Resources = () => {
    const [All, setAll] = useState({ all: true, article: false, integrations: false });
    const [showAll, setShowAll] = useState([]);
    const [showAllArticles, setShowAllArticles] = useState([]);
    const [showAllIntegrations, setShowAllIntegrations] = useState([]);
    const [modal, setModal] = useState([]);

    useEffect(() => {
        getAllData();
        getAllIntegrations();
        gatAllArticles()
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
    console.log("show", showAllArticles);

    const getAllIntegrations = async () => {
        const entry = await client.getEntries({
            content_type: "integrations",
            order: "sys.id",
        });

        setShowAllIntegrations(entry.items)

    }

    const gatAllArticles = async () => {
        const entry = await client.getEntries({
            content_type: "articles",
            order: "sys.id",
        });
        console.log("articles", entry.items)
        setShowAllArticles(entry.items);
    }
    const handleAllResources = () => {
        setAll({ all: true, article: false, integrations: false });
    }

    const handleArticles = () => {
        setAll({ all: false, article: true, integrations: false });
    }

    const handleintegrations = () => {
        setAll({ all: false, article: false, integrations: true });
    }


    const removeSpacesAndHyphens = (slug) => {
        if (slug) {
            return slug?.replace(/\s+/g, "-");
        }
    };

    return (
        <div className='mt-[2rem] sm:mt-[4rem]'>
            <div className='flex justify-center mb-[3rem] '>
                <div className={All.all ? 'cursor-[pointer] border-b-[3px] border-[#f5455c] pb-[8px] px-[22px] text-[14px] sm:text-base ' : 'cursor-[pointer]  pb-[8px] px-[22px] text-[14px] sm:text-base'} onClick={handleAllResources}>All resources</div>
                <div className={All.article ? 'cursor-[pointer] border-b-[3px] border-[#f5455c]  pb-[8px] px-[22px] text-[14px] sm:text-base' : 'cursor-[pointer]  pb-[8px] px-[22px] text-[14px] sm:text-base'} onClick={handleArticles}>Articles</div>
                <div className={All.integrations ? 'cursor-[pointer] border-b-[3px] border-[#f5455c]  pb-[8px] px-[22px] text-[14px] sm:text-base' : 'cursor-[pointer]  pb-[8px] px-[22px] text-[14px] sm:text-base'} onClick={handleintegrations}>Integrations</div>
            </div>
            <div className='mb-[4rem] bg-[#8080804d]'>
                <div class="grid grid-cols-4 gap-8 p-[0px] sm:p-[2rem]">

{All.all == true? <>{showAllArticles?.map((ele, key) =>

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
                style={{ objectFit: "cover" }}
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
</> :""}
                    {All.article == true ? <>{showAllArticles?.map((ele, key) =>

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
                                            {ele.sys.contentType.sys.id}

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
                    {All.integrations == true ? <>{showAllIntegrations?.map((ele, key) =>

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
                                        style={{ objectFit: "cover" }}
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