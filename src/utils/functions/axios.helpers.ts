import { AxiosError } from "axios";

type APIError = {
  status: boolean;
  message: string;
};

export const handleAxiosError = (error: AxiosError<APIError>) => {
  if (error.response) {
    return error.response.data.message;
  }

  if (error.request) {
    return `Bad Request: ${error.request}`;
  }

  return `Error: ${error.message}`;
};
