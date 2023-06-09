import axios from 'axios'
import { returnConfig } from '../_helpers/returnConfig';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const submitCheckout = async (body) => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/accounts/users/`, body);
        return response.data;
    } catch (error) {
        if (error.response.data.non_field_errors) return error.response.data.non_field_errors[0]
        return error
    }
};

export const subscribeCustomer = async (body, token) => {
    try {
        let config = returnConfig()
        const response = await axios.post(`${API_URL}/api/v1/payments/subscriptions/`, body, config);
        return response.data;
    } catch (error) {
        if (error.response.data.non_field_errors) return error.response.data.non_field_errors[0]
        return error
    }
};

