import { useMutation } from "react-query";
import onBoardingService from "../apis/onboarding";

export const useOnboardingPersonalInfo = () => {
  interface RequestBody {
    id: string;
    payload: PersonalInfoPayload;
  }

  return useMutation({
    mutationFn: async ({ id, payload }: RequestBody) => {
      return onBoardingService.updatePersonalInfo(id, payload);
    },
  });
};
