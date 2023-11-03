import Icons from "@/assets/icons";
import { cn } from "@/utils";
import onBoardingService from "@/utils/apis/onboarding";
import Alert from "@/utils/base/alerts";
import { onFormError } from "@/utils/functions/react-hook-form";
import { AccountInoSchema, PersonalInfoSchema, SpaceInfoSchema } from "@/utils/schema/details";
import { type InferSchema } from "@/utils/schema/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Title,
  Text,
  Input,
  Button,
  PhoneInput,
  Select,
} from "@the_human_cipher/components-library";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { SuiteAmenities } from "@/constants";
import { useEffect, useState } from "react";
import UpdatePersonalInfo from "./UpdatePersonalInfo";
import UpdateSpaceInfo from "./UpdateSpaceInfo";
import UpdateAccountInfo from "./UpdateAccountInfo";
// import CardInfo from "./CardInfo";
import useSession from "@/utils/hooks/useSession";
import { useGetUserProfile } from "@/utils/hooks/api/useQuery";
import authService from "@/utils/apis/auth";
import { useQuery } from "react-query";

import userProfileApi from "@/utils/hooks/api/userprofile";
import { SpinnerLoader } from "@/components/atoms/Loader";

const UserProfile = () => {
  const [isEditMode, setIsEditMode] = useState(true);

  const user = authService.getSession();
  const profileId = user!.id;

  const { data } = useQuery({
    queryKey: [`get-user-profile-${profileId}`],
    queryFn: () => userProfileApi.getUserProfile(profileId),
    staleTime: 15 * (60 * 1000),
    cacheTime: 20 * (60 * 1000),
  });

  const userProfile = data?.data;
  console.log("user profile", userProfile);

  return userProfile ? (
    <>
      <UpdatePersonalInfo
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        userProfile={userProfile}
      />
      <UpdateSpaceInfo
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        userProfile={userProfile}
      />
      <UpdateAccountInfo
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        userProfile={userProfile}
      />
      {/* <CardInfo /> */}
    </>
  ) : (
    <></>
  );
};

export default UserProfile;
