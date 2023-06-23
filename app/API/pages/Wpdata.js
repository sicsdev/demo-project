import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_WP_POST_API;

export const getCareersContent = async (body) => {
  // let config = returnConfig()
  try {
    const response = await axios.get(
      `${API_URL}?category=careers`
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
