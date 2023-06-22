import axios from 'axios'
import { returnConfig } from '../_helpers/returnConfig';
const API_URL = process.env.NEXT_WP_POST_DATA_API;

export const getUserProfile = async (token) => {
    const config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/me`, config);
        return response.data;
    } catch (error) {
        return error;
    }
};