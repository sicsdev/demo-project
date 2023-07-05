import axios from 'axios'
import { returnConfig } from '../_helpers/returnConfig';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createContactInFreshsales = async (body) => {
    const config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/integrations/fresh-sales/contacts/`, body, config);
        return response.data;
    } catch (error) {
        return error;
    }
};