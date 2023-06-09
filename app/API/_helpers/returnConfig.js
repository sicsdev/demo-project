export const returnConfig = () => {
    const token = localStorage.getItem("Token");

    const config = { headers: { "Content-Type": "application/json",}, };
    if (token) { config.headers["Authorization"] = "Token " + token }

    return config;
  };