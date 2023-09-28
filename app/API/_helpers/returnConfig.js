import Cookies from "js-cookie";

export const returnConfig = () => {
    const token = Cookies.get("Token")

    const config = { headers: { "Content-Type": "application/json",}, };
    if (token) { config.headers["Authorization"] = "Token " + token }

    return config;
  };
