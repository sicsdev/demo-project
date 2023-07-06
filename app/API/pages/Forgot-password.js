import axios from 'axios'
import { returnConfig } from '../_helpers/returnConfig';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const forgotPassword = async (body) => {
    // const config = returnConfig()

    // const config = {
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    // }
    const config = returnConfig()
    console.log(config)

    try {
        const response = await axios.post(`${API_URL}/api/v1/accounts/users/password-forgot/`, body, config)
        return response.data
    } catch (error) {
        throw new Error(error.response)
    }
};

export const recoveryPassword = async (body) => {
    const config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/accounts/users/password-recover/`, body, config);
        return response.data;
    } catch (error) {
        throw new Error(error.response)
    }
};