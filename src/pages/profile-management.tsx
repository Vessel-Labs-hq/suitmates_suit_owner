import React, { useEffect, useState } from "react";
import Icons from "@/assets/icons";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { onFormError } from "@/utils/functions/react-hook-form";
import Alert from "@/utils/base/alerts";
import onBoardingService from "@/utils/apis/onboarding";
import {
  AccountInoSchema,
  PersonalInfoSchema,
  SpaceInfoSchema,
  // UpdateProfileSchema,
} from "@/utils/schema/details";
import { type InferSchema } from "@/utils/schema/helpers";
import { cn } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Title,
  Text,
  Input,
  Button,
  PhoneInput,
  Select,
} from "@the_human_cipher/components-library";
import { SuiteAmenities } from "@/constants";
import { useQuery } from "react-query";
import { useGetUserProfile } from "@/utils/hooks/api/useQuery";
import useSession from "@/utils/hooks/useSession";
import authService from "@/utils/apis/auth";

type Inputs = InferSchema<typeof PersonalInfoSchema>;
type SpaceInputs = InferSchema<typeof SpaceInfoSchema>;
type AccountInputs = InferSchema<typeof AccountInoSchema>;

type InputName = keyof Inputs;
type Name = keyof SpaceInputs;
type AccountName = keyof AccountInputs;

interface Fields {
  name: InputName;
  label: string;
  type?: string;
}

const fields: Fields[] = [
  {
    name: "first_name",
    label: "First Name",
  },
  {
    name: "last_name",
    label: "Last Name",
  },
  {
    name: "phone_number",
    label: "Phone Number",
  },
  {
    name: "bio",
    label: "Bio",
  },
];

type Label = Name extends `space_${infer A}` ? `Space ${Capitalize<A>}` : Name;

type Field = {
  name: Name;
  label: LoosenString<Label>;
  placeholder: LoosenString<`Enter ${Lowercase<Label>}`>;
};

const spacefields: Field[] = [
  {
    name: "space_name",
    label: "Space Name",
    placeholder: "Enter space name",
  },
  {
    name: "space_address",
    label: "Space Address",
    placeholder: "Enter space address ",
  },
];

type AccountLabel = {
  [Key in AccountName]: Key extends `account_${infer A}` ? `Account ${A}` : Key;
}[AccountName];

type AccountField = {
  name: AccountName;
  label: LoosenString<AccountLabel>;
  // placeholder: LoosenString<`Please enter your ${Lowercase<AccountLabel>}`>;
};

const accountfields: AccountField[] = [
  {
    name: "account_number",
    label: "Account Number",
    // placeholder: "Please enter your account number",
  },
  {
    name: "routing_number",
    label: "Routing Number",
  },
];

const ProfileManagement = () => {
  const user = useSession();
  const userProfileReponse = useGetUserProfile(user?.id!);

  const userProfile = userProfileReponse?.data;
  const spaceProfile = userProfileReponse?.data.space;
  const accountProfile = userProfileReponse?.data.space;

  const { register, formState, handleSubmit, control, watch } = useForm<Inputs>({
    resolver: zodResolver(PersonalInfoSchema),
    mode: "onChange",
    values: userProfile,
  });
  const {
    register: spaceRegister,
    formState: spaceFormState,
    handleSubmit: spaceHandleSubmit,
    control: spaceControl,
    watch: spaceWatch,
  } = useForm<SpaceInputs>({
    resolver: zodResolver(SpaceInfoSchema),
    mode: "onChange",
    values: spaceProfile,
  });

  const {
    register: accountRegister,
    formState: accountFormState,
    handleSubmit: accountHandleSubmit,
  } = useForm<AccountInputs>({
    resolver: zodResolver(AccountInoSchema),
    mode: "onChange",
    values: accountProfile,
  });

  const [isEditMode, setIsEditMode] = useState(true);

  const onSubmitUserUpdate: SubmitHandler<Inputs> = async (data, e) => {
    if (user?.id) {
      try {
        const res = await onBoardingService.updatePersonalInfo(user?.id, data);
        if (res) {
        }
      } catch (error) {
        Alert.error(error);
      }
    } else {
      Alert.error("User is undefined");
    }
  };

  const onSubmitSpaceUpdate: SubmitHandler<SpaceInputs> = async (data) => {
    try {
      const res = await onBoardingService.createSpace(data);

      if (res) {
        // onSubmit(String(res.data.id));
      }
    } catch (error) {
      Alert.error(error);
    }
  };

  const onSubmitAccountUpdate: SubmitHandler<AccountInputs> = async (data) => {
    if (spaceId) {
      try {
        const res = await onBoardingService.addAccountDetails({
          spaceId,
          accountDetails: data,
        });

        if (res) {
          // onSubmit();
        }
      } catch (error) {
        Alert.error(error);
      }
    } else {
      Alert.error("Space Id is undefined, error creating Suite");
    }
  };

  const handleEditClick = (e: Event) => {
    e.preventDefault();
    setIsEditMode(false);
  };

  const getFormError = (key: keyof Inputs) => {
    const err = formState.errors[key]?.message;
    return err ? String(err) : undefined;
  };

  const getSpaceFormError = (key: keyof SpaceInputs) => {
    const err = spaceFormState.errors[key]?.message;
    return err ? String(err) : undefined;
  };

  const assertError = (key: keyof SpaceInputs): boolean => {
    return Boolean(spaceFormState.errors[key]?.message);
  };

  const getAccountFormError = (key: keyof AccountInputs) => {
    const err = accountFormState.errors[key]?.message;
    return err ? String(err) : undefined;
  };

  const { isSubmitting: isLoading } = formState;

  const selectedFile = watch("avatar");
  const watchAmenities = spaceWatch("space_amenities");

  return (
    <DashboardLayout headerDesc="Update your personal & business information here">
      <main>
        <div className="my-4 mt-16">
          <form onSubmit={handleSubmit(onSubmitUserUpdate, onFormError)}>
            <div className="mx-auto max-w-[1180px]">
              <div className="flex justify-between">
                <div className="flex">
                  <Controller
                    control={control}
                    name="avatar"
                    render={({ field: { onChange, value, ...rest } }) => (
                      <label
                        className={cn(
                          "relative flex h-[180px] w-[180px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-full border-[6px] border-[#F0D0BE]",
                          getFormError("avatar") && "border-borderNegative/70"
                        )}
                      >
                        <span className="h-full w-full [&>*]:h-full [&>*]:w-full">
                          {Icons.GalleryMaskGroup}
                        </span>
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                          {Icons.PhotoGallery}
                        </span>
                        {selectedFile && (
                          <span
                            className={cn(
                              "absolute top-0 flex h-[120px] w-full items-center justify-center bg-[#F3F3F3] pt-10 text-sm "
                            )}
                          >
                            {selectedFile?.name}
                          </span>
                        )}
                        <input
                          {...rest}
                          value={value?.fileName}
                          className="absolute inset-0 z-[1] hidden opacity-0"
                          type="file"
                          onChange={(e) => {
                            onChange(e.target.files?.[0]);
                          }}
                          disabled={isEditMode}
                        />
                        <span className="absolute bottom-3 left-1/2 -translate-x-1/2">Upload</span>
                      </label>
                    )}
                  />
                </div>

                <div>
                  <Button
                    className="mt-16 h-16 w-52 rounded-lg bg-[#3BAF75] text-lg font-medium text-white"
                    onClick={handleEditClick}
                  >
                    Edit Information
                  </Button>
                </div>
              </div>

              <div className="mt-10 grid gap-x-28 gap-y-6 md:grid-cols-2">
                {fields.slice(0, 2).map((field) => (
                  <Input
                    {...field}
                    key={field.name}
                    className="py-3"
                    {...register(field.name)}
                    hint={getFormError(field.name)}
                    isError={Boolean(getFormError(field.name))}
                    disabled={isEditMode}
                  />
                ))}
                <Controller
                  name="phone_number"
                  control={control}
                  render={({ field: { onChange, value, ...rest } }) => (
                    <PhoneInput
                      {...rest}
                      {...fields[2]}
                      label="Phone Number"
                      onChange={onChange}
                      value={value}
                      hint={getFormError("phone_number")}
                      isError={Boolean(getFormError("phone_number"))}
                      disabled={isEditMode}
                    />
                  )}
                />
                <Input
                  {...fields[3]}
                  {...register("bio")}
                  hint={getFormError("bio")}
                  isError={Boolean(getFormError("bio"))}
                  disabled={isEditMode}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  className={`h-16 w-24 rounded-xl ${
                    isEditMode
                      ? "cursor-not-allowed bg-[#f9f7f7]"
                      : "bg-green-500 hover:bg-green-700"
                  } text-lg font-medium text-white`}
                  disabled={isEditMode}
                  type="submit"
                  loading={isLoading}
                >
                  Save
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="my-4 mt-16">
          <form onSubmit={spaceHandleSubmit(onSubmitSpaceUpdate)}>
            <div className="mx-auto max-w-[1180px]">
              <div className="mt-12">
                <span className="text-base font-bold text-[#333333]">Space Information</span>
              </div>
              <div className="mt-10 grid gap-x-28 gap-y-6 md:grid-cols-2 md:gap-y-10">
                <label>
                  Space Name
                  <Input
                    key={"space_name"}
                    className="py-3"
                    {...spaceRegister("space_name")}
                    hint={getSpaceFormError("space_name")}
                    isError={Boolean(getSpaceFormError("space_name"))}
                    disabled={isEditMode}
                  />
                </label>

                <Controller
                  control={spaceControl}
                  name="space_amenities"
                  render={({ field: { value, onChange, ...rest } }) => (
                    <div>
                      <Select
                        {...rest}
                        options={SuiteAmenities}
                        label="Space amenities"
                        placeholder="Select..."
                        onChange={(e) => onChange(e)}
                        value={watchAmenities}
                        multiple
                        isError={assertError("space_amenities")}
                        hint={getSpaceFormError("space_amenities") ?? "Select all that is offered"}
                        hideMultipleSelectedValue
                        multipleSelectedLabel={
                          <span className="lowercase first-letter:uppercase">
                            Selected +{watchAmenities?.length} option(s)
                          </span>
                        }
                      />
                    </div>
                  )}
                />

                <label>
                  Space Address
                  <Input
                    key={"space_name"}
                    className="py-3"
                    {...spaceRegister("space_name")}
                    hint={getSpaceFormError("space_name")}
                    isError={Boolean(getSpaceFormError("space_name"))}
                    disabled={isEditMode}
                  />
                </label>
              </div>
              <div className="flex justify-end">
                <Button
                  className={`h-16 w-24 rounded-xl ${
                    isEditMode
                      ? "cursor-not-allowed bg-[#f9f7f7]"
                      : "bg-green-500 hover:bg-green-700"
                  } text-lg font-medium text-white`}
                  disabled={isEditMode}
                  type="submit"
                  loading={isLoading}
                >
                  Save
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="my-4 mt-16">
          <form onSubmit={accountHandleSubmit(onSubmitAccountUpdate)}>
            <div className="mx-auto max-w-[1180px]">
              <div className="mt-12">
                <span className="text-base font-bold text-[#333333]">Bank Details</span>
              </div>
              <div className="mt-10 grid gap-x-28 gap-y-6 md:grid-cols-2 md:gap-y-10">
                {accountfields.map((field) => (
                  <Input
                    {...field}
                    key={field.name}
                    className="py-3"
                    {...accountRegister(field.name)}
                    hint={getAccountFormError(field.name)}
                    isError={Boolean(getAccountFormError(field.name))}
                    disabled={isEditMode}
                  />
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  className={`h-16 w-24 rounded-xl ${
                    isEditMode
                      ? "cursor-not-allowed bg-[#f9f7f7]"
                      : "bg-green-500 hover:bg-green-700"
                  } text-lg font-medium text-white`}
                  disabled={isEditMode}
                  type="submit"
                  loading={isLoading}
                >
                  Save
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div className="mx-auto max-w-[1180px]">
          <div className="mt-4 flex h-48 w-3/6 rounded-xl bg-[#E8E8E8]">
            <div className="space-y-7 px-10 py-8">
              <p className="text-base font-normal">
                Billed to: <span>5676*******754</span>
              </p>
              <p className="text-base font-normal">
                Suitemate subscription: <span>USD $25/month</span>
              </p>
              <p className="text-base font-normal">
                Next payment: <span className="text-[#3BAF75]">April 10, 2023</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default ProfileManagement;
