import axios from 'axios'
import { returnConfig } from '../_helpers/returnConfig';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllMembers = async () => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/accounts/users/`, config);
        return response.data;
    } catch (error) {
        return error
    }
};

export const InviteMembers = async (body) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/accounts/users/invite/`, body, config);
        return response;
    } catch (error) {
        return error.response.data
    }
};


export const deleteMember = async (email) => {

    let config = returnConfig()
    try {
        const response = await axios.delete(`${API_URL}/api/v1/accounts/users/${email}/`, config);
        return response;
    } catch (error) {
        return error.response.data
    }
}

export const changeMemberRole = async (email, body) => {
    let config = returnConfig()
    try {
        const response = await axios.patch(`${API_URL}/api/v1/accounts/users/${email}/`, body, config);
        return response;
    } catch (error) {
        return error.response.data
    }
}