import axios from 'axios'
import { returnConfig } from '../_helpers/returnConfig';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAvailableMobileNumbers = async (area_code) => {
    const config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/phone-numbers/available?area_code=${area_code}`, config);
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

export const getEnterprisePhones = async () => {
    const config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/phone-numbers/ID/`, config);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getMyPhoneNumbers = async () => {
    const config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/phone-numbers/`, config);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const updatePhoneNumberData = async (data, id) => {
    /*
        Active: true/false (Active or Disable a Phone Number)
        bots:=[{'bot': "ID-BOT", "option": 1, "voice": "rachel" }] \ # voice now are rachel,jack, "option" can be also 0 for default (all options)
    */
    const config = returnConfig()
    try {
        const response = await axios.patch(`${API_URL}/api/v1/main/phone-numbers/${id}/`, data, config);
        return response;
    } catch (error) {
        return error;
    }
};