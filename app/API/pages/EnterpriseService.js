import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const getWindow = () => {
    if (typeof window !== "undefined") {
      return window;
    }
    return null;
  };
const config = {
    headers: {
        "Authorization": "Token " +  getWindow()?.localStorage.getItem("Token")
    },
}
export const createEnterpriseAccount = async (body) => {
    try {
        const response = await axios.patch(`${API_URL}/api/v1/accounts/enterprises/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};


