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


