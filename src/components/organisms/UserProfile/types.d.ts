interface ProfileProps {
  isEditMode: boolean;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
  userProfile: DbUserProfileResponse;
  //   spaceId
  //   profileId?: number;
}

interface Props {
  onSubmit(): void;
  personId?: number;
}
