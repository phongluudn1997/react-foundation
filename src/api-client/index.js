import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const client = async (endpoint, { data, token, headers, ...config } = {}) => {
  try {
    const { data: responseData } = await axios({
      baseURL: API_URL,
      url: endpoint,
      method: data ? "post" : "get",
      headers: {
        "Content-Type": data ? "application/json" : undefined,
        Authorization: token ? `Bearer ${token}` : undefined,
        ...headers,
      },
      ...config,
    });
    return responseData;
  } catch (error) {
    // return error.response;
    return Promise.reject(error.response.data);
  }
};

export { client };
