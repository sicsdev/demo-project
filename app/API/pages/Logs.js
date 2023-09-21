import axios from 'axios'
import { returnConfig } from '../_helpers/returnConfig';
const API_URL = process.env.NEXT_PUBLIC_API_URL;


export const setViewed = async (conversationId, body) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/conversations/${conversationId}/view/`, body, config);
        return response;
    } catch (error) {
        return error
    }
}


export const setForReview = async (conversationId, body) => {
    let config = returnConfig()
    try {
        const response = await axios.patch(`${API_URL}/api/v1/main/conversations/${conversationId}/`, body, config);
        return response;
    } catch (error) {
        return error
    }
}