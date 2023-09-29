import Icons from "@/assets/icons";
import { cn } from "@/utils";
import authService from "@/utils/apis/auth";
import { useOnboardingPersonalInfo } from "@/utils/hooks/onboarding";
import { PersonalInfoSchema } from "@/utils/schema/details";
import { type InferSchema } from "@/utils/schema/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Title,
  Text,
  Input,
  Button,
} from "@the_human_cipher/components-library";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

type Inputs = InferSchema<typeof PersonalInfoSchema>;

type InputName = keyof Inputs;

interface Fields {
  name: InputName;
  label: string;
  placeholder?: string;
  type?: string;
}

interface Props {
  onSubmit(): void;
}

const fields: Fields[] = [
  {
    name: "first_name",
    label: "First Name",
    placeholder: "Please enter your first name",
  },
  {
    name: "last_name",
    label: "Last Name",
    placeholder: "Please enter your last name",
  },
  {
    name: "phone_number",
    label: "Phone Number",
    placeholder: "(999) 999-9999",
  },
  {
    name: "email",
    label: "Email Address",
    placeholder: "Davemariam@gmail.com",
    type: "email",
  },
];

const PersonalInformation = ({ onSubmit }: Props) => {
  const user = authService.getSession();

  const { register, formState, handleSubmit, control, watch } = useForm<Inputs>(
    {
      resolver: zodResolver(PersonalInfoSchema),
      mode: "onChange",
    }
  );

  const { mutate, status, isLoading, isError, isSuccess } =
    useOnboardingPersonalInfo();

  const selectedFile = watch("avatar");

  const onFormSubmit: SubmitHandler<Inputs> = (data) => {
    onSubmit();

    mutate({
      id: "",
      payload: data,
    });
  };

  const getFormError = (key: keyof Inputs) => {
    const err = formState.errors[key]?.message;
    return err ? String(err) : undefined;
  };

  console.log(user);

  return (
    <section className="mx-auto max-w-[960px]">
      <div className="my-4 mt-16">
        <Title weight="bold" level={2}>
          Almost done let us get to know you
        </Title>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="ml-4">
            <Text className="my-5 block font-bold">Personal Information </Text>
            <div className="w-[180px]">
              <Controller
                control={control}
                name="avatar"
                render={({ field: { onChange, value, ...rest } }) => (
                  <label className="relative flex h-[180px] w-[180px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-full border-[4px] border-[#F0D0BE]">
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
                    />
                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2">
                      Upload
                    </span>
                  </label>
                )}
              />
              <div
                className={cn(
                  "mt-2 max-h-0 origin-top overflow-hidden text-center text-sm text-white transition-all duration-300 ease-out",
                  getFormError("avatar") &&
                    "max-h-[100px] text-[#5e5e5e] opacity-100"
                )}
              >
                {getFormError("avatar")}
              </div>
            </div>
          </div>
          <div className="mt-10 grid gap-x-10 gap-y-6 md:grid-cols-2">
            {fields.map((field) => (
              <Input
                {...field}
                key={field.name}
                className="py-3"
                {...register(field.name)}
                hint={getFormError(field.name)}
                isError={Boolean(getFormError(field.name))}
              />
            ))}
          </div>
          <Button
            type="submit"
            className="mx-auto mt-10 flex max-w-xs items-center justify-center"
            primary
            loading={isLoading}
          >
            {isLoading ? "Loading..." : "Next"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default PersonalInformation;
