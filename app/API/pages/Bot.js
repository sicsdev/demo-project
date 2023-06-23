import axios from 'axios'
import { returnConfig } from '../_helpers/returnConfig';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createBot = async (body) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/bots/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};
// export const createBotFaqFile = async (id, body) => {
//     let config = returnConfig()

//     try {
//         const response = await axios.post(`${API_URL}/api/v1/main/bots/${id}/knowledge/`, body, config);
//         return response;
//     } catch (error) {
//         return error
//     }
// };

export const getBotWidget = async (id) => {
    let config = returnConfig()

    try {
        const response = await axios.get(`${API_URL}/api/v1/main/bots/${id}/widget/`, config);
        return response;
    } catch (error) {
        return error
    }
};
export const getBotAllData = async () => {
    let config = returnConfig()

    try {
        const response = await axios.get(`${API_URL}/api/v1/main/bots/`, config);
        return response.data;
    } catch (error) {
        return error
    }
};


export const getAllWidgetData = async (ids) => {
    let config = returnConfig()

    try {
        const apiRequests = ids.map((id) => axios.get(`${API_URL}/api/v1/main/bots/${id}/widget/`, config));
        const responses = await axios.all(apiRequests);
        return responses;
    } catch (error) {
        throw error;
    }
}

export const getAllBotData = async (ids) => {
    let config = returnConfig()
    try {
        const apiRequests = ids.map((id) => axios.get(`${API_URL}/api/v1/main/bots/${id}/`, config));
        const responses = await axios.all(apiRequests);
        return responses;
    } catch (error) {
        throw error;
    }
}

export const createBotKnowledge = async (id, body) => {
    let config = returnConfig()

    try {
        const response = await axios.post(`${API_URL}/api/v1/main/bots/${id}/knowledge/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};

export const modifyBot = async (id, body) => {
    let config = returnConfig()
    debugger
    try {
        const response = await axios.patch(`${API_URL}/api/v1/main/bots/${id}/`, body, config);
        return response;
    } catch (error) {
        return error
    }
}

export const checkBotInstallation = async (id) => {
    debugger
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/bots/${id}/widget/check/`, config);

        return response;
    } catch (error) {
        return error
    }
}