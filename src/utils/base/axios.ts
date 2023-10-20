import axios from "axios";
import { clientENV } from "./env";
import authService from "../apis/auth";
import { handleAxiosError } from "../functions/axios.helpers";
import Alert from "../base/alerts";

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
    const user = authService.getSession();

    if (user) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = handleAxiosError(error);

    if (error?.response?.status === 401) {
      message = "DO_NOT_ERROR";

      /** Runs only the client */
      if (typeof window !== "undefined") {
        Alert.info("Please sign in to continue");

        authService.logOut();
      }
    }

    return Promise.reject(message);
  }
);
