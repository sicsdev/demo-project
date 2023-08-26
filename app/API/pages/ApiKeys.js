import axios from 'axios'
import { returnConfig } from '../_helpers/returnConfig';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getKeyPairs = async () => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/accounts/enterprises/api-keys/`, config);
        return response;
    } catch (error) {
        return error
    }
};
export const createKeyPairs = async (body) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/accounts/enterprises/api-keys/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};
export const getKeyPairsById = async (id) => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/accounts/enterprises/api-keys/${id}/`, config);
        return response;
    } catch (error) {
        return error
    }
};
export const deleteKeyPairsById = async (id) => {
    let config = returnConfig()
    try {
        const response = await axios.delete(`${API_URL}/api/v1/accounts/enterprises/api-keys/${id}/`, config);
        return response;
    } catch (error) {
        return error
    }
};
