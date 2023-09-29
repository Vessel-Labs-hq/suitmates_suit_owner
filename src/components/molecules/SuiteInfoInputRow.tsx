import { InferSchema } from "@/utils/schema/helpers";
import { SuiteDetailSchema, SuiteInfoSchema } from "@/utils/schema/details";
import { Input, Select } from "@the_human_cipher/components-library";
import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
  useForm,
} from "react-hook-form";

type FormValues = InferSchema<typeof SuiteInfoSchema>;

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

interface Props {
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  idx: number;
  formState: FormState<FormValues>;
}

const SuiteInfoInputRow = ({ control, register, idx, formState }: Props) => {
  const getFormError = (key: keyof Inputs) => {
    if (["suiteDuration", "suiteType"].includes(key)) {
      const err = (
        (formState.errors?.suiteInfo?.[idx]?.[key] as any)?.value
          ?.message as string
      )?.replace("Value", key.replace("suite", ""));

      return err ? String(err) : undefined;
    }
    const err = formState.errors?.suiteInfo?.[idx]?.[key]?.message;
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
          {...register(`suiteInfo.${idx}.${name}`)}
          hint={getFormError(name)}
          isError={Boolean(getFormError(name))}
        />
      ))}
      <Controller
        control={control}
        name={`suiteInfo.${idx}.suiteType`}
        render={({ field: { name, onChange, value } }) => (
          <Select
            // label="Suite Type"
            options={[
              { label: "House", value: "House" },
              { label: "Store", value: "Store" },
            ]}
            placeHolder="Suite Type"
            onChange={onChange}
            value={value}
            listbox-name={name}
            hint={getFormError("suiteType")}
            isError={Boolean(getFormError("suiteType"))}
          />
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
              {...register(`suiteInfo.${idx}.${name}`)}
              hint={getFormError(name)}
              isError={Boolean(getFormError(name))}
            />
          ))}
        </div>
        <div className="absolute -top-5 right-0 w-full max-w-fit md:max-w-[100px]">
          <Controller
            control={control}
            name={`suiteInfo.${idx}.suiteDuration`}
            render={({ field: { name, onChange, value } }) => (
              <Select
                options={[
                  { label: "Daily", value: "Weekly" },
                  { label: "Weekly", value: "Weekly" },
                  { label: "Monthly", value: "Monthly" },
                ]}
                placeHolder="Range"
                onChange={onChange}
                value={value}
                isError={Boolean(getFormError("suiteDuration"))}
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
