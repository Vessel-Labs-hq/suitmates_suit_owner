import { notificationsAPI } from "@/utils/apis/notifications";
import { useQuery } from "react-query";

export const useGetNotifications = () => {
  const response = useQuery({
    queryFn: notificationsAPI.getNotifications,
    queryKey: ["get-notifications"],
  });

  return response;
};
