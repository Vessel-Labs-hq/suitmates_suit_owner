import axios from "axios";
import { clientENV } from "./env";

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

API.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
