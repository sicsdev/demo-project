import axios from 'axios'
import { returnConfig } from '../_helpers/returnConfig';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getPaymentHistory = async (stripe_customer_id) => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/payments/stripe-payments-history?customer_id=${stripe_customer_id}`, config);
        return response.data;
    } catch (error) {
        return error
    }
};

export const getBillingByBotID = async (botId) => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/payments/stripe-payments-history/bot/${botId}`, config);
        return response.data;
    } catch (error) {
        return error
    }
};


export const getBotGraphData = async (ids) => {
    let config = returnConfig()
    try {
        const apiRequests = ids.map((id) => axios.get(`${API_URL}/api/v1/main/bots/${id}/usage/`, config));
        const responses = await axios.all(apiRequests);
        return responses;
    } catch (error) {
        throw error;
    }
}

export const getBotGraphDataUsedIn = async (ids) => {
    let config = returnConfig()
    try {
        const apiRequests = ids.map((id) => axios.get(`${API_URL}/api/v1/main/bots/${id}/used-in/`, config));
        const responses = await axios.all(apiRequests);
        return responses;
    } catch (error) {
        throw error;
    }
}



