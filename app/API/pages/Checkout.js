import axios from 'axios'
import { returnConfig } from '../_helpers/returnConfig';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const submitCheckout = async (body) => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/accounts/users/`, body);
        return response.data;
    } catch (error) {
        if (error?.response?.data?.non_field_errors) return error.response.data.non_field_errors[0]
        return error
    }
};

export const subscribeCustomer = async (body, token) => {
    // Due to synchronization, it is likely that we do not have the token stored in local storage yet, that's why we receive it through params
    const configForSubscribe = { headers: { "Authorization": "Token " + token } }

    try {
        const response = await axios.post(`${API_URL}/api/v1/payments/subscriptions/`, body, configForSubscribe);
        return response.data;
    } catch (error) {
        if (error?.response?.data?.non_field_errors) return error.response.data.non_field_errors[0]
        return error
    }
};

export const getBillingDetails = async (id) => {
    let config = returnConfig()
    try {
        console.log(config)
        const response = await axios.get(`${API_URL}/api/v1/payments/payment-method/?customer_id=${id}`, config);
        return response.data;
    } catch (error) {
        if (error?.response?.data?.non_field_errors) return error.response.data.non_field_errors[0]
        return error
    }
}
export const getPaymentDetails = async () => {
    let config = returnConfig()
    try {
        console.log(config)
        const response = await axios.get(`${API_URL}/api/v1/payments/subscriptions/`, config);
        return response.data;
    } catch (error) {
        if (error?.response?.data?.non_field_errors) return error.response.data.non_field_errors[0]
        return error
    }
}
export const createBillingUser = async (data) => {
    let config = returnConfig()
    try {
        console.log(config)
        const response = await axios.post(`${API_URL}/api/v1/payments/payment-method/update/`, JSON.stringify(data),config);
        return response;
    } catch (error) {
        if (error?.response?.data?.non_field_errors) return error.response.data.non_field_errors[0]
        return error
    }
}
export const createPaymentIntent = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/payments/stripe-payment-intent/`, JSON.stringify(data));
        return response.data;
    } catch (error) {
        if (error?.response?.data?.non_field_errors) return error.response.data.non_field_errors[0]
        return error
    }
}
