import { useState } from "react";
import UpdatePersonalInfo from "./UpdatePersonalInfo";
import UpdateSpaceInfo from "./UpdateSpaceInfo";
import UpdateAccountInfo from "./UpdateAccountInfo";
import CardInfo from "./CardInfo";
import authService from "@/utils/apis/auth";
import { useQuery } from "react-query";

import userProfileApi from "@/utils/hooks/api/userprofile";
import { SpinnerLoader } from "@/components/atoms/Loader";

const UserProfile = () => {
  const [isEditMode, setIsEditMode] = useState(true);

  const user = authService.getSession();
  const profileId = user!.id;

  const { data } = useQuery({
    queryKey: ["get-user-profile", profileId],
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
      <CardInfo />
    </>
  ) : (
    <>
      <SpinnerLoader fullScreen />
    </>
  );
};

export default UserProfile;
