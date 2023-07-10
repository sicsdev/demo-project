import axios from 'axios'
import { returnConfig } from '../_helpers/returnConfig';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const addIntegrationData = async (body) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/integrations/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};

export const getAllIntegration = async () => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/integrations/`, config);
        return response.data;
    } catch (error) {
        return error
    }
};

export const getAllAutomations = async () => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/automations`, config);
        return response.data;
    } catch (error) {
        return error
    }
};

export const createIntegrationAutomation = async (body, id) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/integrations/${id}/automations/`, body, config);
        console.log("response", response);
        return response;
    } catch (error) {
        return error
    }
};