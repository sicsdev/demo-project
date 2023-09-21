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


export const deleteKnowledgeRecord = async (id) => {
    let config = returnConfig()
    try {
        const response = await axios.delete(`${API_URL}/api/v1/main/knowledge/${id}/`, config);
        return response;
    } catch (error) {
        return error
    }
};

export const updateKnowledgeRecord = async (body, id) => {
    let config = returnConfig()
    try {
        const response = await axios.patch(`${API_URL}/api/v1/main/knowledge/${id}/`, body, config);
        return response;
    } catch (error) {
        return error.response.data
    }
}

export const deleteKnowledgeFAQ = async (id, faqid) => {
    let config = returnConfig()
    try {
        const response = await axios.delete(`${API_URL}/api/v1/main/knowledge/${id}/faqs/${faqid}`, config);
        return response;
    } catch (error) {
        return error
    }
};

export const patchKnowledgeQuestion = async (body, id) => {

    // answer= \
    //   question= \
    //   active= \

    let config = returnConfig()
    try {
        const response = await axios.patch(`${API_URL}/api/v1/main/faqs/${id}/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};

export const getFaqQuestions = async (queryParam) => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/faqs?${queryParam}`, config);
        return response?.data;
    } catch (error) {
        return error
    }
};
