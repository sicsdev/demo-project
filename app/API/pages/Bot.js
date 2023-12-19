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
export const createCheckoutBot = async (body, token) => {
    let config = { headers: { "Content-Type": "application/json", "Authorization": "Token " + token } };
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/bots/`, body, config);
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
    try {
        const response = await axios.patch(`${API_URL}/api/v1/main/bots/${id}/`, body, config);
        return response;
    } catch (error) {
        return error
    }
}

export const checkBotInstallation = async (id) => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/bots/${id}/widget/check/`, config);

        return response;
    } catch (error) {
        return error
    }
}
export const getBotConversation = async (id, queryParam = ``) => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/bots/${id}/conversations/${queryParam}`, config);
        return response;
    } catch (error) {
        return error
    }
}
export const getPaginateBotConversation = async (id, page, queryParam, page_size = 10) => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/bots/${id}/conversations/?page=${page}&page_size=${page_size}${queryParam}`, config);
        return response;
    } catch (error) {
        return error
    }
}
export const getBotConversationMessages = async (id) => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/conversations/${id}/messages/`, config);
        return response;
    } catch (error) {
        return error
    }
}
export const addBotConversationMessagesReaction = async (id, body) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/messages/${id}/reaction/`, body, config);
        return response;
    } catch (error) {
        return error
    }
}

export const addBlockedUrl = async (id, body) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/bots/${id}/origins/blocked/`, body, config);
        return response;
    } catch (error) {
        return error
    }
}

export const removeBlockedUrl = async (id, body) => {
    let config = returnConfig()
    config.data = body
    try {
        const response = await axios.delete(`${API_URL}/api/v1/main/bots/${id}/origins/blocked/`, config);
        return response;
    } catch (error) {
        return error
    }
}


export const addAllowedUrl = async (id, body) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/bots/${id}/origins/allowed/`, body, config);
        return response;
    } catch (error) {
        return error
    }
}

// Integration

export const addIntegration = async (body) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/integrations/`, body, config);
        return response;
    } catch (error) {
        return error
    }
}

export const uploadLOgo = async (body) => {
    let config = returnConfig()
    try {
        const response = await axios.patch(`${API_URL}/api/v1/accounts/enterprises/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};

export const uploadLogoWithToken = async (body, token) => {
    let config = { headers: { "Content-Type": "application/json", "Authorization": "Token " + token } };
    try {
        const response = await axios.patch(`${API_URL}/api/v1/accounts/enterprises/`, body, config);
        return response;
    } catch (error) {
        return error
    }
}

export const getBase64LogoUsingAUrl = async (url) => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/accounts/enterprise/get-logo?url=${url}/`, config);
        return response.data;
    } catch (error) {
        return error
    }
}


export const modifyIntegration = async (body) => {
    let config = returnConfig()
    try {
        const response = await axios.patch(`${API_URL}/api/v1/main/integrations/`, body, config);
        return response;
    } catch (error) {
        return error
    }
}

export const getAllActiveBots = async () => {
    let config = returnConfig()

    try {
        const response = await axios.get(`${API_URL}/api/v1/main/bots?active=true`, config);
        return response.data;
    } catch (error) {
        return error
    }
};


export const getBotById = async (id) => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/bots/${id}`, config);
        return response.data;
    } catch (error) {
        return error
    }
}

export const exportCsvFile = async (id, filter = ``) => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/bots/${id}/conversations/export-csv${filter !== '' ? '?' + filter : ''}`, config);
        return response.data;
    } catch (error) {
        return error
    }
}

export const disputeCharge = async (body, id) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/conversations/${id}/dispute-charge/`, body, config);
        return response;
    } catch (error) {
        return error
    }
}