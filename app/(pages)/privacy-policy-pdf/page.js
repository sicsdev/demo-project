"use client"
import React from 'react'
import { useEffect } from 'react';

const page = () => {
    const handleDownload = () => {
        const pdfPath = "privacy.pdf";
        const link = document.createElement("a");
        link.href = pdfPath;
        link.target = "_blank";
        link.download = "downloaded_file.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      useEffect(()=>{
        handleDownload()
      },[])
  return (
    <div></div>
  )
}

export default page