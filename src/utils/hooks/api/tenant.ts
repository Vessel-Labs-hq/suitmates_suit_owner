import tenantAPI from "@/utils/apis/tenant";
import { useQuery } from "react-query";

export const useGetAllTenants = () => {
  const response = useQuery({
    queryFn: tenantAPI.getAllTenants,
    queryKey: ["get-all-tenants"],
  });

  return response;
};
