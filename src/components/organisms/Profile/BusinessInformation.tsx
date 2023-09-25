import Icons from "@/assets/icons";
import Select from "@/components/atoms/Select";
import { DaysOfTheWeek, SalonOccupations, WorkingHours } from "@/constants";
import { formatWord } from "@/utils";
import { BusinessInfoSchema } from "@/utils/schema/details";
import { InferSchema } from "@/utils/schema/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Title,
  Text,
  Input,
  Button,
  ColorType,
} from "@the_human_cipher/components-library";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface Props {
  onSubmit(): void;
}

type Inputs = InferSchema<typeof BusinessInfoSchema>;

const BusinessInformation = ({ onSubmit }: Props) => {
  const { formState, register, handleSubmit, control } = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(BusinessInfoSchema),
  });

  const onFormSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    onSubmit();
  };

  const unWrapErrors = (key: keyof Inputs) => {
    const err = formState.errors[key]?.message;
    return err ? String(err) : undefined;
  };

  const assertError = (key: keyof Inputs): boolean => {
    return Boolean(formState.errors[key]?.message);
  };

  return (
    <section className="mx-auto max-w-[960px]">
      <form onSubmit={handleSubmit(onFormSubmit)} className="my-4 mt-16">
        <Title weight="bold" level={2}>
          Great tell us about your suite{" "}
        </Title>
        <div>
          <Text className="my-5 block font-bold">Business Details</Text>
        </div>
        <div className="grid gap-x-10 gap-y-6 md:grid-cols-2">
          <Input
            className="py-4"
            label="Business Name"
            placeholder="Please enter your business name"
            {...register("businessName")}
            isError={assertError("businessName")}
            hint={unWrapErrors("businessName")}
          />
          <div className="grid grid-cols-2 gap-4">
            <Controller
              control={control}
              name="openHours"
              render={({ field: { value, onChange, ...rest } }) => (
                <Select
                  {...rest}
                  data={WorkingHours.map((time) => ({
                    label: time.label,
                    value: String(time.value),
                  }))}
                  label="Hours of business"
                  placeholder="Select..."
                  onChange={onChange}
                  defaultValue={value}
                  isError={assertError("openHours")}
                  hint={unWrapErrors("openHours") ?? "Select when you open"}
                />
              )}
            />
            <Select
              data={WorkingHours.map((time) => ({
                label: time.label,
                value: String(time.value),
              }))}
              label="Hours of business"
              placeholder="Select..."
              isMulti
              // {...register("closeHours")}
              isError={assertError("closeHours")}
              hint={unWrapErrors("closeHours") ?? "Select when you close"}
            />
          </div>
          <Select
            data={DaysOfTheWeek.map((day) => ({
              label: formatWord(day),
              value: day,
            }))}
            label="Days of business "
            placeholder="Select..."
            // {...register("workingDays")}
            isError={assertError("workingDays")}
            hint={unWrapErrors("workingDays") ?? "Select days you are open"}
          />
          <Input
            className="py-4"
            label="Website"
            placeholder="Please enter your website"
            // {...register("website")}
            isError={assertError("website")}
            hint={unWrapErrors("website")}
          />
          <div>
            <Select
              label="Occupation"
              placeholder="Please select what you do"
              data={SalonOccupations}
              // {...register("occupation")}
              isError={assertError("occupation")}
              hint={unWrapErrors("occupation")}
            />
          </div>
          <div className="space-y-2">
            <p>Upload license</p>
            <label className="flex h-[140px] w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#D9D9D9] bg-[#F3F3F3]">
              <span>Drop files here to upload…</span>
              <input type="file" hidden {...register("license")} />
              <span className="rounded-full bg-[#E8E8E8] px-4 py-2">
                Browse files
              </span>
            </label>
          </div>
        </div>
        <Button type="submit" className="mx-auto mt-10 block max-w-xs" primary>
          Next
        </Button>
      </form>
    </section>
  );
};

export default BusinessInformation;
