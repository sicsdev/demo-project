import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const returnConfig = () => {
    const config = {
        headers: {
            "Authorization": "Token " + localStorage.getItem("Token")
        },
    }
    return config
}


export const getUserProfile = async (token) => {
    const config = returnConfig()
    try {
        console.log(config)
        const response = await axios.get(`${API_URL}/api/v1/me`, config);
        return response.data;
    } catch (error) {
        return error;
    }
};