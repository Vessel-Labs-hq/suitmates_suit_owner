import rentHistoryApi from "@/utils/apis/rent-history";
import { useQuery } from "react-query";

export const useGetAllRentHistory = () => {
  const response = useQuery({
    queryKey: ["get-all-rent-history"],
    queryFn: rentHistoryApi.getAllRentHistory,
  });

  return response;
};

export const useGetRentChartHistory = () => {
  const response = useQuery({
    queryKey: ["get-rent-chart-history"],
    queryFn: rentHistoryApi.getRentChartHistory,
  });

  return response;
};

export const useGetManualRentUpload = () => {
  const response = useQuery({
    queryKey: ["get-manual-rent-uploads"],
    queryFn: rentHistoryApi.getManualRentUpload,
  });

  return response;
};
