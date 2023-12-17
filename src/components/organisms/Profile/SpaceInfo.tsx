import { SuiteAmenities } from "@/constants";
import onBoardingService from "@/utils/apis/onboarding";
import Alert from "@/utils/base/alerts";
import { SpaceInfoSchema } from "@/utils/schema/details";
import { type InferSchema } from "@/utils/schema/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title, Text, Input, Button, Select } from "@the_human_cipher/components-library";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

interface Props {
  onSubmit(spaceId: string): void;
}

type Inputs = InferSchema<typeof SpaceInfoSchema>;

type Name = keyof Inputs;

/**
 * totally useless codes, just wanted to do some ts magic
 */
type Label = Name extends `space_${infer A}` ? `Space ${Capitalize<A>}` : Name;

type Field = {
  name: Name;
  label: LoosenString<Label>;
  placeholder: LoosenString<`Enter ${Lowercase<Label>}`>;
};

const fields: Field[] = [
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

const spaceFields: Field[] = [
  {
    name: "space_size_one",
    label: "Space Size Length (sq. ft.)",
    placeholder: "Enter space size ",
  },
  {
    name: "space_size_two",
    label: "Space Size Breadth (sq. ft.)",
    placeholder: "Enter space size ",
  },
];

const SpaceInformation = ({ onSubmit }: Props) => {
  const { register, formState, handleSubmit, control } = useForm<Inputs>({
    resolver: zodResolver(SpaceInfoSchema),
    mode: "onChange",
  });

  const onFormSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await onBoardingService.createSpace(data);

      if (res) {
        onSubmit(String(res.data.id));
      }
    } catch (error) {
      Alert.error(error);
    }
  };

  const getFormError = (key: keyof Inputs) => {
    const err = formState.errors[key]?.message;
    return err ? String(err) : undefined;
  };

  const assertError = (key: keyof Inputs): boolean => {
    return Boolean(formState.errors[key]?.message);
  };

  const { isSubmitting } = formState;

  return (
    <section className="mx-auto max-w-[960px]">
      <div className="my-4 mt-16">
        <Title weight="bold" level={2}>
          Great tell us about your space
        </Title>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="ml-4">
            <Text className="my-5 block font-bold">Space Information</Text>
          </div>
          <div className="mt-10 grid gap-x-10 gap-y-6 md:grid-cols-2 md:gap-y-10">
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
            <div className="flex items-center gap-2">
              <Input
                {...spaceFields[0]}
                className="py-3"
                wrapperClass="w-full"
                {...register("space_size_one")}
                hint={getFormError("space_size_one")}
                isError={Boolean(getFormError("space_size_one"))}
              />
              <span className="mt-2 text-sm">by</span>
              <Input
                {...spaceFields[1]}
                wrapperClass="w-full"
                className="py-3"
                {...register("space_size_two")}
                hint={getFormError("space_size_two")}
                isError={Boolean(getFormError("space_size_two"))}
              />
            </div>
            <Controller
              control={control}
              name="space_amenities"
              render={({ field: { value, onChange, ...rest } }) => (
                <Select
                  {...rest}
                  options={SuiteAmenities}
                  label="Space amenities"
                  placeholder="Select..."
                  onChange={(e) => onChange(e)}
                  value={value}
                  multiple
                  isError={assertError("space_amenities")}
                  hint={getFormError("space_amenities") ?? "Select all that is offered"}
                  hideMultipleSelectedValue
                />
              )}
            />
          </div>
          <Button
            type="submit"
            className="mx-auto mt-10 block max-w-xs"
            loading={isSubmitting}
          >
            Next
          </Button>
        </form>
      </div>
    </section>
  );
};

export default SpaceInformation;
