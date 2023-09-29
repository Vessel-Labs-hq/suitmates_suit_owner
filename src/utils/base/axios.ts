import axios from "axios";
import { clientENV } from "./env";
import authService from "../apis/auth";

/**
 *
 * @example
 * ```tsx
 * API.post("/register", { email, password })
 * ```
 */
export const API = axios.create({
  baseURL: clientENV.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const user = authService.getSession(true);

    if (user) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
