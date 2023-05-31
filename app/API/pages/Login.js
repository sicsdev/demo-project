import axios from 'axios' 

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const submitLogin = async (body) => {
    try {
      const response = await axios.post(`${API_URL}/api/v1/auth/login/`, body);
      
      return response.data;
    } catch (error) {
      if (error.response.data.non_field_errors) return error.response.data.non_field_errors[0]
        return error
    }
  };


