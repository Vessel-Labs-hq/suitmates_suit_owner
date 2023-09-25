import { InferSchema } from "@/utils/schema/helpers";
import { SuiteDetailSchema, SuiteInfoSchema } from "@/utils/schema/details";
import { Input } from "@the_human_cipher/components-library";
import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "../atoms/Select";
import { cn } from "@/utils";
import Icons from "@/assets/icons";

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
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 max-md:text-sm xs:gap-x-10 lg:grid-cols-4">
      {fields.map(({ name, label, ...ele }) => (
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
      <div className="relative flex items-start">
        <div className="w-full">
          <Controller
            control={control}
            name={`suiteInfo.${idx}.suiteType`}
            render={({ field: { name, onChange, value } }) => (
              <Select
                label="Suite Type"
                data={[
                  { label: "House", value: "House" },
                  { label: "Store", value: "Store" },
                ]}
                onChange={onChange}
                value={value}
                name={name}
                hint={getFormError("suiteType")}
                isError={Boolean(getFormError("suiteType"))}
                className="max-md:text-sm"
                /** https://onebite.dev/how-to-add-word-space-in-tailwind-css/ */
                labelClass="max-xs:[word-spacing:-0.3ch]"
              />
            )}
          />
        </div>
        <div className="absolute -top-5 right-0 w-full max-w-fit md:max-w-[100px]">
          <Controller
            control={control}
            name={`suiteInfo.${idx}.suiteDuration`}
            render={({ field: { name, onChange, value } }) => (
              <Select
                label=""
                data={[
                  { label: "Daily", value: "Weekly" },
                  { label: "Weekly", value: "Weekly" },
                  { label: "Monthly", value: "Monthly" },
                ]}
                wrapperStyles={cn(
                  "h-fit px-1 text-[10px] xs:text-xs md:h-[36px] md:px-2 md:text-sm "
                )}
                classNames={{
                  placeholder: () => cn("text-[10px] xs:text-xs md:text-sm"),
                  dropdownIndicator: (state) => cn("max-md:w-"),
                }}
                placeholder="Weekly"
                onChange={onChange}
                value={value}
                name={name}
                isError={Boolean(getFormError("suiteDuration"))}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SuiteInfoInputRow;
