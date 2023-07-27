"use client";
import React, { useEffect, useState } from "react";
import { getArticlePage, getAllArticles } from "@/app/API/pages/Wpdata";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import Link from "next/link";

const page = () => {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);

  const [single, setSingle] = useState("");
  const scrollSlug = "/article/stripe-integration";
  useEffect(() => {
    let params = "stripe-integration";
    getArticlePage(params).then((res) => {
      setSingle(res.data[0]);
      console.log("resss", res);
    });
    relatedPosts();
  }, []);

  const relatedPosts = () => {
    getAllArticles().then(
      (res) => {
        setArticle(res.data.posts);
        sekeletonData();
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const sekeletonData = () => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  const filterPosts = article.filter((x) => x.ID != single?.id);


  const removeSpacesAndHyphens = (slug) => {
    if (slug) {
      return slug?.replace(/\s+/g, "_");
    }
  };

  return (
    <div className="bg-white px-[20px] sm:px-0  sm:pl-[10%] ">

    </div>
  );
};

export default page;
