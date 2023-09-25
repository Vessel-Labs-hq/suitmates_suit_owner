import Select from "@/components/atoms/Select";
import { SpaceInfoSchema } from "@/utils/schema/details";
import { type InferSchema } from "@/utils/schema/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Title,
  Text,
  Input,
  Button,
} from "@the_human_cipher/components-library";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

interface Props {
  onSubmit(): void;
}

type Inputs = InferSchema<typeof SpaceInfoSchema>;

type Name = keyof Inputs;

/**
 * totally useless codes, just wanted to do some ts magic
 */
type Label = Name extends `space${infer A}` ? `Space ${A}` : Name;

type Field = {
  name: Name;
  label: Loosen<Label>;
  placeholder: Loosen<`Enter ${Lowercase<Label>}`>;
};

const fields: Field[] = [
  {
    name: "spaceName",
    label: "Name",
    placeholder: "Enter space name",
  },
  {
    name: "spaceAddress",
    label: "Space Address",
    placeholder: "Enter space address ",
  },
  {
    name: "spaceSize",
    label: "Space Size (sq. ft.)",
    placeholder: "Enter space size ",
  },
];

const SpaceInformation = ({ onSubmit }: Props) => {
  const { register, formState, handleSubmit, control } = useForm<Inputs>({
    resolver: zodResolver(SpaceInfoSchema),
    mode: "onChange",
  });

  const onFormSubmit: SubmitHandler<Inputs> = (data) => {
    onSubmit();
  };

  const getFormError = (key: keyof Inputs) => {
    const err = formState.errors[key]?.message;
    return err ? String(err) : undefined;
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
            <Controller
              control={control}
              name="spaceAmenities"
              render={({ field: { value, onChange, ...rest } }) => (
                <Select
                  {...rest}
                  data={[
                    { label: "24 hours light", value: "24 hours light" },
                    { label: "Security", value: "Security" },
                  ]}
                  label="Space amenities"
                  placeholder="Select..."
                  onChange={onChange}
                  value={value}
                  isError={assertError("spaceAmenities")}
                  hint={
                    unWrapErrors("spaceAmenities") ??
                    "Select all that is offered"
                  }
                />
              )}
            />
          </div>
          <Button
            type="submit"
            className="mx-auto mt-10 block max-w-xs"
            primary
          >
            Next
          </Button>
        </form>
      </div>
    </section>
  );
};

export default SpaceInformation;
