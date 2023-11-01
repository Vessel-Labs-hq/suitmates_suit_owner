interface ProfileProps {
  isEditMode: boolean;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
  userProfile: DbUserProfileResponse;
}

interface Props {
  onSubmit(): void;
  personId?: number;
}
