import { InferSchema } from "@/utils/schema/helpers";
import { SuiteDetailSchema, SuiteInfoSchema } from "@/utils/schema/details";
import { Input, Select } from "@the_human_cipher/components-library";
import { Control, Controller, FormState, UseFormRegister, useForm } from "react-hook-form";
import { capitalizeFirstLetter } from "@/utils";

type FormValues = InferSchema<typeof SuiteInfoSchema>;

type Inputs = InferSchema<typeof SuiteDetailSchema>;

type Name = keyof Inputs;

/**
 * totally useless codes, just wanted to do some ts magic
 *
 * @edit => turned out handing while refactoring
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
    name: "suite_number",
    placeholder: "Enter suite number",
  },
  {
    label: "Suite Size",
    name: "suite_size",
    placeholder: "Enter suite size",
  },
  {
    label: "Suite Cost",
    name: "suite_cost",
    placeholder: "Enter suite cost",
  },
];

interface Props {
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  idx: number;
  formState: FormState<FormValues>;
}

const SuiteInfoInputRow = ({ control, register, idx, formState }: Props) => {
  const getFormError = (key: keyof Inputs) => {
    if (["timing", "suite_type"].includes(key)) {
      const err = (
        (formState.errors?.suites?.[idx]?.[key] as any)?.value?.message as string
      )?.replace("Value", key.replace("suite_", ""));

      return err ? capitalizeFirstLetter(String(err)) : undefined;
    }
    const err = formState.errors?.suites?.[idx]?.[key]?.message;
    return err ? String(err) : undefined;
  };

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 max-md:text-sm xs:gap-x-10 md:grid-cols-4">
      {fields.slice(0, 2).map(({ name, label, ...ele }) => (
        <Input
          {...ele}
          key={name}
          label={label}
          className="py-3"
          {...register(`suites.${idx}.${name}`)}
          hint={getFormError(name)}
          isError={Boolean(getFormError(name))}
        />
      ))}
      <Controller
        control={control}
        name={`suites.${idx}.suite_type`}
        render={({ field: { name, onChange, value } }) => (
          <div className="mt-1">
            <Select
              label="Suite Type"
              options={[
                { label: "Single", value: "single" },
                { label: "Double", value: "double" },
              ]}
              placeholder="Suite Type"
              onChange={onChange}
              value={value}
              listbox-name={name}
              hint={getFormError("suite_type")}
              isError={Boolean(getFormError("suite_type"))}
            />
          </div>
        )}
      />
      <div className="relative flex items-start">
        <div className="w-full">
          {fields.slice(2).map(({ name, label, ...ele }) => (
            <Input
              {...ele}
              key={name}
              label={label}
              className="py-3"
              {...register(`suites.${idx}.${name}`)}
              hint={getFormError(name)}
              isError={Boolean(getFormError(name))}
            />
          ))}
        </div>
        <div className="absolute -top-6 right-0 w-full max-w-fit md:max-w-[100px]">
          <Controller
            control={control}
            name={`suites.${idx}.timing`}
            render={({ field: { name, onChange, value } }) => (
              <Select
                options={[
                  { label: "Daily", value: "Daily" },
                  { label: "Weekly", value: "Weekly" },
                  { label: "Monthly", value: "Monthly" },
                ]}
                placeholder="Range"
                onChange={onChange}
                value={value}
                isError={Boolean(getFormError("timing"))}
                listbox-name={name}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SuiteInfoInputRow;
