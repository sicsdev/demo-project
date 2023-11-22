"use client";
import HomeComponent from "@/app/components/Home/HomeComponent";
import Middlebar from "@/app/components/Info-Screen/Middlebar";
import CommunicateScrollComp from "@/app/components/LayoutNew/CommunicateScrollComp";
import Panelcardnew from "@/app/components/PanelCardNew/PanelCardNew";
import Banner from "@/app/components/Products/Banner";
import Concierge from "@/app/components/Products/Concierge";
import ProductForm from "@/app/components/Products/ProductForm";
import ProductSection2 from "@/app/components/Products/ProductSection2";
import ProductSection3 from "@/app/components/Products/ProductSection3";
import ProductSection7 from "@/app/components/Products/ProductSection7";
import React from "react";
import { useRef } from "react";
const page = () => {
  const ref = useRef(null);
  const handleClickScroll = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="bg-white">
      <Banner handleClickScroll={handleClickScroll} />
      <div className="sm:mt-[75vh]">
        <ProductSection2 handleClickScroll={handleClickScroll} />
      </div>
      <ProductSection3 handleClickScroll={handleClickScroll} />

      <Concierge />
      <ProductSection7 />
      <Panelcardnew />
      {/* <CommunicateScrollComp /> */}
      {/* <Middlebar /> */}
      {/* <ProductForm reference={ref} /> */}
      <HomeComponent />
    </div>
  );
};

export default page;
