import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const getWindow = () => {
    if (typeof window !== "undefined") {
        return window;
    }
    return null;
};

// const config = {
//     headers: {
//         "Authorization": "Token " + getWindow()?.localStorage.getItem("Token")
//     },
// }

export const getUserProfile = async (token) => {
    const config = { headers: { "Authorization": "Token " + token } }
    try {
        console.log(config)
        const response = await axios.get(`${API_URL}/api/v1/me`, config);
        return response.data;
    } catch (error) {
        return error;
    }
};