import maintenanceApi from "@/utils/apis/maintenance";
import onBoardingService from "@/utils/apis/onboarding";
import { useQuery } from "react-query";

interface UseGetSpaceParams {
  id: SN;
}

export const useGetSpace = ({ id }: UseGetSpaceParams) => {
  const response = useQuery({
    queryFn: () => onBoardingService.getUserSpace(id),
    queryKey: ["get-user-space", id],
    staleTime: 15 * (60 * 1000),
    cacheTime: 20 * (60 * 1000),
  });

  return response;
};

export const useGetAllAnalyzedSpaceData = () => {
  const response = useQuery({
    queryKey: ["get-all-analyzed-space-data"],
    queryFn: maintenanceApi.getSpaceChartData,
    staleTime: 15 * (60 * 1000),
    cacheTime: 20 * (60 * 1000),
  });

  return response;
};
