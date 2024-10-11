// api.js
import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants"; 

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Ensure no trailing slash
});

// Request interceptor to add the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh on 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an unauthorized request
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        console.log("Refresh Token Retrieved:", refreshToken); // Debugging line

        if (!refreshToken) {
          throw new Error("No refresh token found in localStorage.");
        }

        // Prepare the payload
        const payload = { refresh: refreshToken };
        console.log("Refresh Payload:", payload); // Debugging line

        // Make the refresh token request
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/token/refresh/`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Refresh Response:", response.data); // Debugging line

        const newAccessToken = response.data.access;
        localStorage.setItem(ACCESS_TOKEN, newAccessToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

        // Retry the original request with the new access token
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token process failed:", refreshError);

        // Optional: Redirect to login if refresh fails
        // window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    // If the error is not due to an unauthorized request, reject it
    return Promise.reject(error);
  }
);

export default api;
