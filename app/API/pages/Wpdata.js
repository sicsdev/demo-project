import axios from "axios";

export const getCareersContent = async (body) => {
  // let config = returnConfig()
  try {
    const response = await axios.get(
      `https://public-api.wordpress.com/rest/v1.1/sites/usetempo.ai/posts?category=careers`
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
      `https://usetempo.wpcomstaging.com/wp-json/wp/v2/posts?slug=${params.slug}`
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
      `https://usetempo.wpcomstaging.com/wp-json/wp/v2/posts?categories=20466`
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
      `https://usetempo.wpcomstaging.com/wp-json/wp/v2/posts?categories=763026347`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
