import { useQuery } from "react-query";
import userProfileApi from "@/utils/hooks/api/userprofile";
// import userSpaceProfileApi from "@/utils/hooks/api/userprofile";

export const useGetUserProfile = (personId: number) => {
  const response = useQuery({
    queryKey: [`get-user-profile`],
    queryFn: () => userProfileApi.getUserProfile(personId),
    staleTime: 15 * (60 * 1000),
    cacheTime: 20 * (60 * 1000),
  });
  return response.data;
};

// export const useGetUserSpaceProfile = (spaceId: string) => {
//   const response = useQuery({
//     queryKey: [`get-user-space-profile`],
//     queryFn: () => userSpaceProfileApi.updateUserSpace({}),
//     staleTime: 15 * (60 * 1000),
//     cacheTime: 20 * (60 * 1000),
//   });
//   return response.data;
// };
