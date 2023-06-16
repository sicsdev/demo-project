import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const submitLogin = async (body) => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/auth/login/`, body);
        return response.data;
    } catch (error) {
        throw new Error(error.response)
    }
};


