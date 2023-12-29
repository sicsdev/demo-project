import axios from 'axios'
import { returnConfig } from '../_helpers/returnConfig';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCustomerDetailsById = async (customer_id) => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/accounts/customers/${customer_id}/`, config);
        return response;
    } catch (error) {
        return error
    }
};


export const getAllCustomerConversationsById = async (customer_id) => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/accounts/customers/${customer_id}/conversations/`, config);
        return response;
    } catch (error) {
        return error
    }
};