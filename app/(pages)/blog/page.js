"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "contentful";
import AboveBlog from "@/app/components/Bloglayout/AboveBlog";
import Popularblog from "@/app/components/Bloglayout/Popularblog";
import HomeComponent from "@/app/components/Home/HomeComponent";
import AllBlog from "@/app/components/Bloglayout/AllBlog";
import { da } from "@faker-js/faker";
const client = createClient({
  space: "i1xiyapirlpi",
  accessToken: "FgLM4I4Od3JmUNYOYds-_SamHUOpOZSDR9T-6x_R_uE",
});

const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  const getRelatedBlogs = async (tag, heading) => {
    const entry = await client.getEntries({
      content_type: "blogs",
      order: "sys.id",
    });
    console.log("", entry.items);
    setBlogData(entry.items);
  };

  useEffect(() => {
    getRelatedBlogs();
  }, []);
  const getFormatDate = (dateString) => {
    var date = new Date(dateString);

    var day = date.getUTCDate();
    var month = date.getUTCMonth() + 1;
    var year = date.getUTCFullYear();

    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    var formattedDate = day + "-" + month + "-" + year;
    return formattedDate;
  };
  const removeSpacesAndHyphens = (slug) => {
    if (slug) {
      return slug?.replace(/\s+/g, "-");
    }
  };
  return (
    <div className="mb-4 sm:pt-[66px] sm:px-[50px] sm:max-w-[1450px] ">
      <AboveBlog
        blogData={blogData[0]}
        getFormatDate={getFormatDate}
        removeSpacesAndHyphens={removeSpacesAndHyphens}
      />
      <Popularblog
        data={blogData}
        getFormatDate={getFormatDate}
        removeSpacesAndHyphens={removeSpacesAndHyphens}
      />
      <AllBlog
        data={blogData}
        getFormatDate={getFormatDate}
        removeSpacesAndHyphens={removeSpacesAndHyphens}
      />
      <HomeComponent />
    </div>
  );
};

export default Blog;
