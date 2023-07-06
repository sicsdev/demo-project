"use client";
import React, { useEffect } from "react";
import Articleside from "../components/Article/Articleside";
import Nav from "../components/Layout/Nav";
import { getArticlePage } from "../API/pages/Wpdata";
export default function PageLayout({ children }) {

useEffect(()=>{
  getArticlePage().then((res)=>{
let params = res.data.posts
console.log("slugg", params)
  })
},[]);


  return (
    <div className="sm:w-[1400px]  lg:w-[1400px] md:w-[1400px]  m-auto bg-white">
      <Nav />
      <Articleside >
      {children}
  </Articleside>
    </div>
  );
}
