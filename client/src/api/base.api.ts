import axios from "axios";

const baseApiUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/v1";

export const baseApiClient = axios.create({
  baseURL: baseApiUrl,
  withCredentials: true,
});

baseApiClient.interceptors.request.use(
  (config) => {
    // You can add any custom logic here, such as adding authentication tokens
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

baseApiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // You can handle errors globally here, such as logging out the user on 401
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
    }
    return Promise.reject(error);
  },
);

export default baseApiClient;
