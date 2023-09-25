import { InferSchema } from "@/utils/schema/helpers";
import { SuiteDetailSchema } from "@/utils/schema/details";
import { Input } from "@the_human_cipher/components-library";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "../atoms/Select";

type Inputs = InferSchema<typeof SuiteDetailSchema>;

type Name = keyof Inputs;

/**
 * totally useless codes, just wanted to do some ts magic
 */
type Label = FindAndSeparate<Name, "suite">;

type Field = {
  name: Name;
  label: LoosenString<Label>;
  placeholder: LoosenString<`Enter ${Lowercase<Label>}`>;
};

const fields: Field[] = [
  {
    label: "Suite Number",
    name: "suiteNumber",
    placeholder: "Enter suite number",
  },
  {
    label: "Suite Size",
    name: "suiteSize",
    placeholder: "Enter suite size",
  },
  {
    label: "Suite Cost",
    name: "suiteCost",
    placeholder: "Enter suite cost",
  },
];

const SuiteInfoInputRow = () => {
  const { register, formState, control } = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(SuiteDetailSchema),
  });

  const getFormError = (key: keyof Inputs) => {
    const err = formState.errors[key]?.message;
    return err ? String(err) : undefined;
  };

  /*   const assertError = (key: keyof Inputs): boolean => {
    return Boolean(formState.errors[key]?.message);
  }; */

  return (
    <div className="grid grid-cols-2 gap-x-10 gap-y-8">
      {fields.map(({ name, ...ele }) => (
        <Input
          {...ele}
          key={name}
          className="py-3"
          {...register(name)}
          hint={getFormError(name)}
          isError={Boolean(getFormError(name))}
        />
      ))}
      <Controller
        control={control}
        name="suiteType"
        render={({ field: { name, onChange, value } }) => (
          <Select
            label="Suite Type"
            data={[]}
            onChange={onChange}
            value={value}
            name={name}
          />
        )}
      />
    </div>
  );
};

export default SuiteInfoInputRow;
