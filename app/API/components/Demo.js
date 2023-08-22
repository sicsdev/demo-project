import axios from "axios";
import { returnConfig } from "../_helpers/returnConfig";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createContactInFreshsales = async (properties) => {
  const config = returnConfig();
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/integrations/hubspot/create_contact/`,
      { properties }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};


export const updateContactInHubspot = async (properties, id) => {
  const config = returnConfig();
  try {
    const response = await axios.patch(
      `${API_URL}/api/v1/integrations/hubspot/update_contact/${id}`,
      { properties }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
