import maintenanceApi from "@/utils/apis/maintenance";
import { useQuery } from "react-query";

export const useGetAllMaintenance = () => {
  const response = useQuery({
    queryKey: ["get-all-maintenance"],
    queryFn: maintenanceApi.getAllMaintenanceRequest,
    staleTime: 15 * (60 * 1000),
    cacheTime: 20 * (60 * 1000),
  });

  return response;
};
