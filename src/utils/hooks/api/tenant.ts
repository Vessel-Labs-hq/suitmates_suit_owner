import tenantAPI from "@/utils/apis/tenant";
import { useQuery } from "react-query";

export const useGetAllTenants = () => {
  const response = useQuery({
    queryFn: tenantAPI.getAllTenants,
    queryKey: ["get-all-tenants"],
    staleTime: 15 * (60 * 1000),
    cacheTime: 20 * (60 * 1000),
  });

  return response;
};
