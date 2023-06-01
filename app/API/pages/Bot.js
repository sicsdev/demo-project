import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const config = {
    headers: {
        "Authorization": "Token " + window.localStorage.getItem("Token")
    },
}
export const createBot = async (body) => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/bots/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};
export const createBotFaqFile = async (id,body) => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/bots/${id}/knowledge/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};
export const getBotWidget = async (id,body) => {
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/bots/${id}/widget/`,config);
        return response;
    } catch (error) {
        return error
    }
};
export const getBotAllData = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/bots/`,config);
        return response.data;
    } catch (error) {
        return error
    }
};


