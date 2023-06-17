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
