import axios from 'axios'
import getConfig from 'next/config';

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

// • Instructions for exchangeGoogleToken body:
// client_id: The client ID provided by Amazon Cognito.
// client_secret: The client secret provided by Amazon Cognito.
// redirect_uri: Redirect URI.
// grant_type: Set it to "authorization_code".
// code: The authorization code received in the query parameters of the redirect URI.


// to get user info: https://tempouserpool.auth.eu-north-1.amazoncognito.com/oauth2/userInfo

export const getUserInfoFromCognito = async (token) => {
    
        const config = { headers: { 'Authorization': `Bearer ${token}` } }
    
        try {
            const response = await axios.get(`https://tempouserpool.auth.eu-north-1.amazoncognito.com/oauth2/userInfo`, config);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }