import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_WP_POST_API;

export const getCareersContent = async (body) => {
  try {
    const response = await axios.get(
      `https://public-api.wordpress.com/rest/v1.1/sites/usetempo.ai/posts?category=careers`  
    );
    return response;
  } catch (error) {
    return error.response;
  }
};


export const getBlogsPage = async (body) =>{
  try{
    const response = await axios.get(
      `https://usetempo.wpcomstaging.com/wp-json/wp/v2/posts?categories=763026346`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};


export const getSingleBlogsPage = async (params) =>{
  try{
    const response = await axios.get(
      `https://usetempo.wpcomstaging.com/wp-json/wp/v2/posts?slug=${params.slug}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};