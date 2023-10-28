import onBoardingService from "@/utils/apis/onboarding";
import { useQuery } from "react-query";

export const useGetSpace = (id: string) => {
  const response = useQuery({
    queryFn: () => onBoardingService.getUserSpace(id),
    queryKey: ["get-user-space"],
    staleTime: 15 * (60 * 1000),
    cacheTime: 20 * (60 * 1000),
  });

  return response;
};
