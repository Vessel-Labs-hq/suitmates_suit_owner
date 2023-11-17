import { API } from "../base/axios";
import { BaseAPIService } from "./base";

class NotificationService extends BaseAPIService {
  getNotifications = async () => {
    const user = this.handleUserSession();
    if (!user) {
      throw new Error("User is undefined");
    }

    const res = await API.get(`/notifications/user/${user.id}`);

    return res.data;
  };
}

export const notificationsAPI = new NotificationService();
