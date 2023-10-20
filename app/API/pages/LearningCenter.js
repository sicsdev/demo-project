import axios from 'axios'
import { returnConfig } from '../_helpers/returnConfig';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const GetAllRecommendations = async (page = 1, queryParam = '', page_size = 10) => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/recommendations?accepted=0&page=${page}&page_size=${page_size}${queryParam}`, config);
        return response.data;
    } catch (error) {
        return error
    }
};

export const updateRecommendationRecord = async (body, id) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/recommendations/${id}/accept/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};

export const deleteRecommendationRecord = async (id) => {
    let config = returnConfig()
    try {
        const response = await axios.delete(`${API_URL}/api/v1/main/recommendations/${id}`, config);
        return response;
    } catch (error) {
        return error
    }
};

export const excludeRecommendationRecord = async (id) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/recommendations/${id}/exclude/`, {}, config);
        return response;
    } catch (error) {
        return error
    }
};
export const expandRecommendationRecord = async (body) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/recommendations/expand-answer/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};

export const updateAnser = async (body, id) => {
    let config = returnConfig()
    try {
        const response = await axios.patch(`${API_URL}/api/v1/main/recommendations/${id}`, body, config);
        return response;
    } catch (error) {
        return error
    }
};


export const acceptInKnowledge = async (recommendationId, faqId) => {

    // Example payload:
    // question = "this is a question" \ # optional, if you don't send it will put what you have in question
    // faq = "ID-FAQ" \

    let config = returnConfig()
    let body = { faq: faqId }
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/recommendations/${recommendationId}/accept-in-knowledge/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};


export const createRecommendation = async (body) => {

    // Example payload:
    // bot=ID-BOT \
    // question="how to get ozempic" \
    let config = returnConfig()

    try {
        const response = await axios.post(`${API_URL}/api/v1/main/recommendations/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};

