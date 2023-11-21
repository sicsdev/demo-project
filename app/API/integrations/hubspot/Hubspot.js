import axios from 'axios'
import { returnConfig } from '../../_helpers/returnConfig';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createHubspotContact = async (payload) => {
    const config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/integrations/hubspot/create_contact/`, payload, config);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const updateHubspotContact = async (body, contact_id) => {
    let config = returnConfig()
    try {
        const response = await axios.patch(`${API_URL}/api/v1/integrations/hubspot/update_contact/${contact_id}/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};
