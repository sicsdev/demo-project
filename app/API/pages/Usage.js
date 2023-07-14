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



