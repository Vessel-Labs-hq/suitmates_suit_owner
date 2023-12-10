import rentHistoryApi from "@/utils/apis/rent-history";
import { useQuery } from "react-query";

export const useGetAllRentHistory = () => {
  const response = useQuery({
    queryKey: ["get-all-rent-history"],
    queryFn: rentHistoryApi.getAllRentHistory,
    staleTime: 15 * (60 * 1000),
    cacheTime: 20 * (60 * 1000),
  });

  return response;
};

export const useGetRentChartHistory = () => {
  const response = useQuery({
    queryKey: ["get-rent-chart-history"],
    queryFn: rentHistoryApi.getRentChartHistory,
    staleTime: 15 * (60 * 1000),
    cacheTime: 20 * (60 * 1000),
  });

  return response;
};
