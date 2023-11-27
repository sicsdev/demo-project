import axios from 'axios'
import { returnConfig } from '../../_helpers/returnConfig';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getSlackMembersList = async (payload) => {
    const config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/integrations/slack/list-users/`, config);
        return response.data;
    } catch (error) {
        return error;
    }
};
