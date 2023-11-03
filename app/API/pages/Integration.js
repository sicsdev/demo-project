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

export const updateIntegrationData = async (body, id) => {
    let config = returnConfig()
    try {
        const response = await axios.patch(`${API_URL}/api/v1/main/integrations/${id}/`, body, config);
        return response;
    } catch (error) {
        return error;
    }
};
export const removeIntegrationData = async (id) => {
    let config = returnConfig()
    try {
        const response = await axios.delete(`${API_URL}/api/v1/main/integrations/${id}/`, config);
        return response;
    } catch (error) {
        return error;
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

export const getAllIntegrationTemplates = async () => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/integration-templates/`, config);
        return response.data;
    } catch (error) {
        return error
    }
};



export const getPopularIntegrationsTemplate = async () => {
    let config = returnConfig()
    try {
        const body = {
            "Agriculture": [
                { "Indigo Agriculture": "indigoag.com" },
                { "Farmers Business Network": "fbn.com" },
                { "AppHarvest": "appharvest.com" },
                { "Bowery Farming": "bowery.co" },
                { "AeroFarms": "aerofarms.com" }
            ],
            "Automotive": [
                { "Rivian": "rivian.com" },
                { "NIO": "nio.com" },
                { "Cruise": "cruise.com" },
                { "Waymo": "waymo.com" },
                { "Zoox": "zoox.com" }
            ]
        }
        const response = await axios.post(`${API_URL}/api/v1/integrations/builwith/popular-integrations/`, body, config);
        return response;
    } catch (error) {
        return error;
    }
};



export const addIntegrationTemplate = async (body, id) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/integration-templates/${id}/add/`, body, config);
        return response;
    } catch (error) {
        return error;
    }
};

export const confirmOuthIntegration = async (body, id) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/integration-templates/${id}/confirm_creds_oauth2/`, body, config);
        return response;
    } catch (error) {
        return error;
    }
};

export const getAllAutomations = async (type) => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/automations?integration__type=${type}`, config);
        return response.data;
    } catch (error) {
        return error
    }
};

export const createIntegrationAutomation = async (body, id) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/integrations/${id}/automations/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};


export const updateIntegrationAutomation = async (body, id) => {
    let config = returnConfig()
    try {
        const response = await axios.patch(`${API_URL}/api/v1/main/automations/${id}/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};
export const getAutomationById = async (id) => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/automations/${id}/`, config);
        return response;
    } catch (error) {
        return error
    }
};

export const getIntegrationAutomation = async (id) => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/integrations/${id}/automations/`, config);
        return response?.data;
    } catch (error) {
        return error
    }
};

export const getActiveIntegrations = async (id) => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/integrations/`, config);
        return response?.data;
    } catch (error) {
        return error
    }
};