import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL;
// const getWindow = () => {
//     if (typeof window !== "undefined") {
//       return window;
//     }
//     return null;
//   };


// const config = {
//     headers: {
//         "Authorization": "Token " + localStorage.getItem("Token")
//     },
// }

const returnConfig = () => {
    const config = {
        headers: {
            "Authorization": "Token " + localStorage.getItem("Token")
        },
    }
    return config
}

export const createBot = async (body) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/bots/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};
export const createBotFaqFile = async (id, body) => {
    let config = returnConfig()

    try {
        const response = await axios.post(`${API_URL}/api/v1/main/bots/${id}/knowledge/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};

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