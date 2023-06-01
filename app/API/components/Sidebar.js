import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const config = {
    headers: {
        "Authorization": "Token " + window.localStorage.getItem("Token")
    },
}

export const getUserProfile = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/v1/me`, config);
        return response;
    } catch (error) {
        return error;
    }
};