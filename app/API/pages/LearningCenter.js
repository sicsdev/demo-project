import axios from 'axios'
import { returnConfig } from '../_helpers/returnConfig';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const GetAllRecommendations = async (page=1) => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/recommendations?page=${page}&page_size=10`, config);
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

export const updateAnser = async (body, id) => {
    let config = returnConfig()
    try {
        const response = await axios.patch(`${API_URL}/api/v1/main/recommendations/${id}`, body, config);
        return response;
    } catch (error) {
        return error
    }
};