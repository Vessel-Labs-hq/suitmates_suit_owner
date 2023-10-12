import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { handleAxiosError } from "../functions/axios.helpers";

class AlertsService {
  private assertMessage(message: unknown): string {
    if (message instanceof AxiosError) {
      return handleAxiosError(message);
    }

    if (typeof message === "string") return message;

    if (typeof message === "object") return JSON.stringify(message);

    return "Something went wrong, please try again";
  }

  error(message: unknown) {
    return toast.error(this.assertMessage(message), {});
  }

  success(message: unknown) {
    return toast.success(this.assertMessage(message), {});
  }

  info(message: unknown) {
    return toast.info(this.assertMessage(message), {});
  }
}

const Alert = new AlertsService();

export default Alert;
