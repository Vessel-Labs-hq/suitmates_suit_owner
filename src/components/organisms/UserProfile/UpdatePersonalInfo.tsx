import Icons from "@/assets/icons";
import Avatar from "@/components/atoms/Avatar";
import { cn } from "@/utils";
import onBoardingService from "@/utils/apis/onboarding";
import Alert from "@/utils/base/alerts";
import { onFormError } from "@/utils/functions/react-hook-form";
import { PersonalInfoSchema } from "@/utils/schema/details";
import { type InferSchema } from "@/utils/schema/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title, Text, Input, Button, PhoneInput } from "@the_human_cipher/components-library";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

type Inputs = InferSchema<typeof PersonalInfoSchema>;

type InputName = keyof Inputs;

interface Fields {
  name: InputName;
  label: string;
  placeholder?: string;
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

const UpdatePersonalInfo = ({ isEditMode, setIsEditMode, userProfile }: ProfileProps) => {
  const { register, formState, handleSubmit, control, watch } = useForm<Inputs>({
    resolver: zodResolver(PersonalInfoSchema),
    mode: "onChange",
    values: userProfile,
  });

  const selectedFile = watch("avatar");

  const onFormSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await onBoardingService.updateUserPersonalInfo(data);
      if (res) {
        Alert.success("Personal information updated successfully");
      }
    } catch (error) {
      Alert.error(error);
    }
  };

  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setIsEditMode(false);
  };

  const getFormError = (key: keyof Inputs) => {
    const err = formState.errors[key]?.message;
    return err ? String(err) : undefined;
  };

  const { isSubmitting: isLoading } = formState;

  return (
    <section>
      <div className="my-4 mt-16">
        <form onSubmit={handleSubmit(onFormSubmit, onFormError)}>
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
                          <Avatar
                            src={userProfile.avatar}
                            name=""
                            className="h-[180px] w-[180px]"
                          />
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
                className={`h-16 w-28 rounded-xl ${
                  isEditMode ? "cursor-not-allowed bg-[#f9f7f7]" : "bg-green-500 hover:bg-green-600"
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
    </section>
  );
};

export default UpdatePersonalInfo;
