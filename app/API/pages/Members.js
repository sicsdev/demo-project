import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const returnConfig = () => {
    const config = {
        headers: {
            "Authorization": "Token " + localStorage.getItem("Token")
        },
    }
    return config
}

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
        const response = await axios.post(`${API_URL}/api/v1/accounts/users/invite/`,body, config);
        return response;
    } catch (error) {
        return error.response.data
    }
};


