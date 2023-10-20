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
    const msg = this.assertMessage(message);

    if (msg === "DO_NOT_ERROR") return;

    return toast.error(msg, {});
  }

  success(message: unknown) {
    const msg = this.assertMessage(message);

    if (msg === "DO_NOT_ERROR") return;

    return toast.success(msg, {});
  }

  info(message: unknown) {
    const msg = this.assertMessage(message);

    if (msg === "DO_NOT_ERROR") return;

    return toast.info(msg, {});
  }
}

const Alert = new AlertsService();

export default Alert;
