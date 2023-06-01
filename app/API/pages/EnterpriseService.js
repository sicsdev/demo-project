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

export const createEnterpriseAccount = async (body) => {
    let config = returnConfig()
    try {
        const response = await axios.patch(`${API_URL}/api/v1/accounts/enterprises/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};


