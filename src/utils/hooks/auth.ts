import { useQuery, useQueryClient, useMutation } from "react-query";
import authService from "../apis/auth";
import { LoginType } from "../schema/login";

const useSignup = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (data: LoginType) => {
            return authService.signup(data);
        },
        // {
        //     onSuccess: () => {
        //         queryClient.invalidateQueries("posts");
        //     },
        // }
    );
};

export {
    useSignup
};