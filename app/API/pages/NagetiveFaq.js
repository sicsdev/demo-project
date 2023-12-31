import axios from 'axios'
import { returnConfig } from '../_helpers/returnConfig';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getNagetiveQuestionData = async () => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/faqs-negative/`, config);
        return response;
    } catch (error) {
        return error
    }
};
export const getSingleNagetiveQuestionData = async (id) => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/faqs/${id}/negatives/`, config);
        return response;
    } catch (error) {
        return error
    }
};

export const addNagetiveQuestionData = async (body) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/faqs-negative/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};

export const editNagetiveQuestionData = async (body, id) => {
    let config = returnConfig()
    try {
        const response = await axios.patch(`${API_URL}/api/v1/main/faqs-negative/${id}`, body, config);
        return response;
    } catch (error) {
        return error
    }
};

export const deleteNagetiveQuestionData = async (id) => {
    let config = returnConfig()
    try {
        const response = await axios.delete(`${API_URL}/api/v1/main/faqs-negative/${id}`, config);
        return response;
    } catch (error) {
        return error
    }
};

export const addNegativeBulkCreate = async (body) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/faqs-negative/bulk-create/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};

export const getAssociatePrompt = async (query) => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/prompts?${query}`, config);
        return response;
    } catch (error) {
        return error
    }
}


export const postModifier = async (body) => {
    // Modifier types: zero-shot, modifier, appender

    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/prompts/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};

export const patchModifier = async (id, body) => {
    let config = returnConfig()
    try {
        const response = await axios.patch(`${API_URL}/api/v1/main/prompts/${id}/`, body, config);
        return response;
    } catch (error) {
        return error
    }
}

export const deleteModifier = async (id) => {
    let config = returnConfig()
    try {
        const response = await axios.delete(`${API_URL}/api/v1/main/prompts/${id}/`, config);
        return response;
    } catch (error) {
        return error
    }
}