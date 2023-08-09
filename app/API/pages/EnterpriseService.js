import axios from 'axios'
import { returnConfig } from '../_helpers/returnConfig';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createEnterpriseAccount = async (body) => {
    let config = returnConfig()
    try {
        const response = await axios.patch(`${API_URL}/api/v1/accounts/enterprises/`, body, config);
        console.log(response)
        return response;
    } catch (error) {
        return error
    }
};



export const enterpriseDomainInitialize = async (body) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/accounts/enterprises/domains/`, body, config);
        console.log(response)
        return response;
    } catch (error) {
        return error
    }
};

export const enterpriseDomainVerify = async (body) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/accounts/enterprises/domains/verify/`, body, config);
        console.log(response)
        return response;
    } catch (error) {
        return error
    }
};

export const updateThresholds = async (body) => {
    let config = returnConfig()
    try {
        const response = await axios.patch(`${API_URL}/api/v1/accounts/enterprises/`, body, config);
        console.log(response)
        return response;
    } catch (error) {
        return error
    }
};



export const uploadImage = async (body,id) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/bots/${id}/customer-files/`, body, config);
        console.log(response)
        return response;
    } catch (error) {
        return error
    }
};

export const addNewDomain = async (body) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/integrations/builwith/get_technologies/`, body, config);
        console.log(response)
        return response;
    } catch (error) {
        return error
    }
};


