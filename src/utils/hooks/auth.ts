import { useQuery, useQueryClient, useMutation } from "react-query";
import authService from "../apis/auth";
import { LoginType } from "../schema/login";

export const useSignup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: LoginType) => {
      return await authService.signup({ ...data, role: "owner" });
    },
    // {
    //     onSuccess: () => {
    //         queryClient.invalidateQueries("posts");
    //     },
    // }
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginType) => {
      return await authService.login(data);
    },
  });
};
