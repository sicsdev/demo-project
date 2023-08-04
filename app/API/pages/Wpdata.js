import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_WP_POST_API;

export const getCareersContent = async (body) => {
  try {
    const response = await axios.get(
      "https://public-api.wordpress.com/rest/v1.1/sites/usetempo.ai/posts?category=careers"
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getCareersJobs = async (params) => {
  // let config = returnConfig()
  try {
    const response = await axios.get(
      `${API_URL}?slug=${params.slug}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getBlogsPage = async (body) =>{
  try{
    const response = await axios.get(
      "https://usetempo.wpcomstaging.com/wp-json/wp/v2/posts?categories=763026346"
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getArticleCategory= async (body) =>{
  try{
    const response = await axios.get(
      "https://usetempo.wpcomstaging.com/wp-json/wp/v2/posts?categories=763026350&per_page=100"
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getCareerCategory= async (body) =>{
  try{
    const response = await axios.get(
      "https://usetempo.wpcomstaging.com/wp-json/wp/v2/posts?categories=20466"
    );
    return response;
  } catch (error) {
    return error.response;
  }
};



export const getAllArticles = async (body) =>{
  try{
    const response = await axios.get(
      "https://public-api.wordpress.com/rest/v1.1/sites/usetempo.ai/posts?category=article"
    );
    return response;
  } catch (error) {
    return error.response;
  }
};


export const getSingleBlogsPage = async (params) =>{
  try{
    const response = await axios.get(
      `https://usetempo.wpcomstaging.com/wp-json/wp/v2/posts?slug=${params}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};


export const getArticlePage = async (params) =>{
  try{
    const response = await axios.get(
      `https://usetempo.wpcomstaging.com/wp-json/wp/v2/posts?slug=${params}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};


export const getAllJobs = async (params) => {
  // let config = returnConfig()
  try {
    const response = await axios.get(
      `${API_URL}?categories=20466`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
 
// help category api

export const getHelpPosts = async (params) => {
  try {
    const response = await axios.get(
      `${API_URL}?categories=763026347`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};