"use client";
import React from "react";
import Button from "../Common/Button/Button";
import Card from "../Common/Card/Card";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import price_data from "./price_data";

const Panelcardnew = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailQuery = searchParams.get("email");

  const handleGetFreeTrial = (e) => {
    router.push(`/checkout?plan=${e.target.id}`);
  };

  return (
    
    <div className="bg-white p-[64px] ">
      <h1 className="text-center text-2xl tracking-wide sm:text-h2 sm:mt-[-28px] sm:mb-[50px] font-bold text-heading">
        Choose your plan
      </h1>
      
    </div>
  );
};

export default Panelcardnew;
