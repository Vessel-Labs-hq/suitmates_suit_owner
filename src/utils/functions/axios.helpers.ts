import { AxiosError } from "axios";

type APIError = {
  status: boolean;
  message: string;
};

export const handleAxiosError = (error: AxiosError<APIError>) => {
  if (error.response) {
    const { status } = error.response;

    /**
     * mute all server related messages
     */
    if (status >= 500) {
      return "An error occurred while processing your request";
    }

    return error.response.data.message;
  }

  if (error.request) {
    return `Bad Request: ${error.request}`;
  }

  return `Error: ${error.message}`;
};
