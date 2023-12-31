import Icons, { IconSlot } from "@/assets/icons";
import { cn } from "@/utils";
import onBoardingService from "@/utils/apis/onboarding";
import Alert from "@/utils/base/alerts";
import { onFormError } from "@/utils/functions/react-hook-form";
import { EditPersonalInfoSchema } from "@/utils/schema/details";
import { type InferSchema } from "@/utils/schema/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button, PhoneInput } from "@the_human_cipher/components-library";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useQueryClient } from "react-query";

type Inputs = InferSchema<typeof EditPersonalInfoSchema>;

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
    name: "email",
    label: "Email Address",
  },
];

const UpdatePersonalInfo = ({ isEditMode, setIsEditMode, userProfile }: ProfileProps) => {
  const { register, formState, handleSubmit, control, watch, setValue } = useForm<Inputs>(
    {
      resolver: zodResolver(EditPersonalInfoSchema),
      mode: "onChange",
      values: userProfile,
    }
  );

  const queryClient = useQueryClient();

  const [selectedFile, setSelectedFile] = useState("avatar");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);

  const onFormSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await onBoardingService.editPersonalInfo(data);
      if (res) {
        queryClient.invalidateQueries({
          queryKey: ["get-user-profile", userProfile.id],
        });
        Alert.success("Personal information updated successfully");
      }
    } catch (error) {
      Alert.error(error);
    }
  };

  const handleEditClick = () => {
    if (isEditMode) {
      setIsEditMode(false);
    } else {
      setIsEditMode(true);
    }

    // better explained here

    let aVar = true;

    if (aVar) {
      aVar = false;
    } else {
      aVar = true;
    }

    // better done as

    aVar = !aVar;
  };

  const getFormError = (key: keyof Inputs) => {
    const err = formState.errors[key]?.message;
    return err ? String(err) : undefined;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file.name);
      setValue("avatar", file);

      // Read the file and set the image source
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImageSrc(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const { isSubmitting: isLoading } = formState;

  return (
    <section>
      <div className="my-4 mt-16">
        <form onSubmit={handleSubmit(onFormSubmit, onFormError)}>
          <div className="mx-auto max-w-[1180px]">
            <div className="flex flex-col justify-between md:flex-row">
              <div className="flex">
                <Controller
                  control={control}
                  name="avatar"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <label
                      className={cn(
                        "relative flex h-[180px] w-[180px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-full border-[6px] border-[#F0D0BE]",
                        getFormError("avatar") && "border-borderNegative/70",
                        isEditMode && "pointer-events-none"
                      )}
                    >
                      <span className="h-full w-full [&>*]:h-full [&>*]:w-full">
                        {Icons.GalleryMaskGroup}
                      </span>
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        {Icons.PhotoGallery}
                      </span>
                      {selectedFile && (imageSrc || userProfile.avatar) && (
                        <div
                          className={cn(
                            "absolute inset-0 top-0 z-[1] flex w-full items-center justify-center bg-[#F3F3F3] bg-cover bg-center text-sm hover:cursor-pointer"
                          )}
                          style={{
                            backgroundImage: `url(${
                              imageSrc ? imageSrc : userProfile.avatar
                            })`,
                          }}
                          onMouseOver={() => setHovered(true)}
                          onMouseLeave={() => setHovered(false)}
                        >
                          <div
                            className={cn(
                              "h-full w-full origin-center bg-black/0 duration-200",
                              hovered && "bg-black/40"
                            )}
                          ></div>
                          <div
                            className={cn(
                              "absolute top-[60%] flex -translate-y-1/2 items-center gap-2 rounded bg-slate-300 px-4 py-1 text-xs opacity-0 duration-500",
                              hovered && "top-1/2 mt-2 -translate-y-1/2 opacity-100"
                            )}
                          >
                            <IconSlot icon="Refresh" className="h-5 w-5" />
                            Change
                          </div>
                        </div>
                      )}
                      <input
                        {...rest}
                        value={value?.fileName}
                        className="absolute inset-0 z-[1] hidden opacity-0"
                        type="file"
                        onChange={handleFileChange}
                        disabled={isEditMode}
                      />
                      {selectedFile ? (
                        ""
                      ) : (
                        <span className="absolute bottom-3 left-1/2 -translate-x-1/2">
                          Upload
                        </span>
                      )}
                    </label>
                  )}
                />
              </div>

              <div className="">
                <Button
                  className="md:w-38 mt-16 flex w-36 items-center justify-center whitespace-nowrap rounded-lg bg-[#3BAF75] px-4 text-base font-normal text-white md:mr-20 md:font-bold"
                  onClick={handleEditClick}
                >
                  {isEditMode ? "Edit Information" : "Cancel"}
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
                {...register("email")}
                hint={getFormError("email")}
                isError={Boolean(getFormError("email"))}
                disabled={isEditMode}
              />
            </div>

            <div className="flex justify-end">
              <Button
                className={cn(
                  "flex h-12 max-w-[200px] items-center justify-center",
                  isEditMode && "bg-gray"
                )}
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
