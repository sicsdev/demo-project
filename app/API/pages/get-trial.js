import axios from 'axios'
import { returnConfig } from '../_helpers/returnConfig';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const setDemoKnowledge = async (body) => {
    let config = returnConfig()
    console.log('setdemopayload', body)
    try {
        const response = await axios.post(`${API_URL}/api/v1/accounts/enterprise/set-demo-knowledge/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};

export const createSlackChannel = async (body, token) => {
    let config = { headers: { "Content-Type": "application/json", "Authorization": "Token " + token } };
    try {
        const response = await axios.post(`${API_URL}/api/v1/integrations/slack/create-channel/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};