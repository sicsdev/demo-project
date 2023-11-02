"use client";
import HomeComponent from "@/app/components/Home/HomeComponent";
import Middlebar from "@/app/components/Info-Screen/Middlebar";
import Panelcardnew from "@/app/components/PanelCardNew/PanelCardNew";
import Concierge from "@/app/components/Products/Concierge";
import Banner from "@/app/components/Products/phone/Banner";
import ProductForm from "@/app/components/Products/ProductForm";
import ProductSection2 from "@/app/components/Products/phone/ProductSection2";
import ProductSection3 from "@/app/components/Products/phone/ProductSection3";
import ProductSection7 from "@/app/components/Products/phone/ProductSection7";
import React, { useRef } from "react";

const page = () => {
  const ref = useRef(null);
  const handleClickScroll = () => {
    console.log("clicked");
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="bg-white">
      <Banner handleClickScroll={handleClickScroll} />
      <ProductSection2 handleClickScroll={handleClickScroll} />
      <ProductSection3 handleClickScroll={handleClickScroll} />

      <Concierge />
      <ProductSection7 />
      <Panelcardnew />
      <Middlebar />
      <ProductForm reference={ref} />
      <HomeComponent />
    </div>
  );
};

export default page;
