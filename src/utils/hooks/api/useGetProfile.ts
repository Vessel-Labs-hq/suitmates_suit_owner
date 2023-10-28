import authService from "@/utils/apis/auth";
import { useQuery } from "react-query";

export const useGetProfile = () => {
  const response = useQuery({
    queryFn: () => authService.getUserDetails(),
    queryKey: ["get-user-details"],
    staleTime: 15 * (60 * 1000),
    cacheTime: 20 * (60 * 1000),
  });

  return response;
};
