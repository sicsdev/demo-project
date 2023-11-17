import axios from 'axios'
import getConfig from 'next/config';
import { returnConfig } from '../_helpers/returnConfig';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const submitLogin = async (body) => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/auth/login/`, body);
        return response.data;
    } catch (error) {
        throw new Error(error.response)
    }
};


export const exchangeGoogleToken = async (body) => {

    const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }

    try {
        const response = await axios.post(`https://tempouserpool.auth.eu-north-1.amazoncognito.com/oauth2/token`, body, config);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const getUserInfoFromCognito = async (token) => {

    const config = { headers: { 'Authorization': `Bearer ${token}` } }

    try {
        const response = await axios.get(`https://tempouserpool.auth.eu-north-1.amazoncognito.com/oauth2/userInfo`, config);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const loginWithGoogle = async (body) => {
    const config = getConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/accounts/google/users/ `, body, config);
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error(error.response)
    }
}

export const createNewGoogleUser = async (body) => {
    const config = getConfig()
    try {

        let headersList = { "Content-Type": "application/json" }
        let bodyContent = JSON.stringify({ ...body, phone_prefix: "99" });

        let reqOptions = {
            url: `${API_URL}/api/v1/accounts/users/google_auth/`,
            method: "POST",
            headers: headersList,
            data: bodyContent,
        }

        let response = await axios.request(reqOptions);
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const fillInvitedUserInfo = async (body) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/accounts/users/fill_invited_info/`, body, config);
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error(error.response)
    }
}

export const loginWithLink = async (body) => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/accounts/magic-link-auth/login/`, body);
        return response;
    } catch (error) {
        throw new Error(error.response)
    }
};

export const validateLinkLogin = async (body) => {
    debugger
    try {
        const response = await axios.post(`${API_URL}/api/v1/accounts/magic-link-auth/validate/`, body);
        return response;
    } catch (error) {
        throw new Error(error.response)
    }
};
