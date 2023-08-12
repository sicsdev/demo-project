import axios from 'axios'
import { returnConfig } from '../_helpers/returnConfig';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getKnowledgeData = async () => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/knowledge/`, config);
        return response;
    } catch (error) {
        return error
    }
};

export const createNewKnowledge = async (body) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/knowledge/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};


