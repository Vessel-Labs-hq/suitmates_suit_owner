import { notificationsAPI } from "@/utils/apis/notifications";
import { useQuery } from "react-query";

export const useGetNotifications = () => {
  const response = useQuery({
    queryFn: notificationsAPI.getNotifications,
    queryKey: ["get-notifications"],
    staleTime: 15 * (60 * 1000),
    cacheTime: 20 * (60 * 1000),
  });

  return response;
};
