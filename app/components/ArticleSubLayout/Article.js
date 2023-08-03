"use client";
import React from "react";
import { ArticleSidebar } from "./ArticleSidebar";

const Article = ({ children }) => {
  return (
    <>
      <ArticleSidebar>{children}</ArticleSidebar>
    </>
  );
};

export default Article;
