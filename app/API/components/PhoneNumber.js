import axios from 'axios'
import { returnConfig } from '../_helpers/returnConfig';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAvailableMobileNumbers = async (area_code) => {
    const config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/phone-numbers?area_code=${area_code}`, config);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const buyAvailableMobileNumbers = async (data) => {
    const config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/phone-numbers/`, data, config);
        return response.data;
    } catch (error) {
        return error;
    }
};