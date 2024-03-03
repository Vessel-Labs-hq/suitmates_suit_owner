import { InferSchema } from "@/utils/schema/helpers";
import { SuiteDetailSchema, SuiteInfoSchema } from "@/utils/schema/details";
import { Input, Select } from "@the_human_cipher/components-library";
import { Control, Controller, FormState, UseFormRegister } from "react-hook-form";
import { capitalizeFirstLetter, cn } from "@/utils";

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
  isAmount?: true;
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
    isAmount: true,
  },
];

interface Props {
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  idx: number;
  formState: FormState<FormValues>;
  wrapperClass?: string;
}

const SuiteInfoInputRow = (props: Props) => {
  const { control, register, idx, formState, wrapperClass } = props;

  const getFormError = (key: keyof Inputs) => {
    const err = formState.errors?.suites?.[idx]?.[key]?.message;
    return err ? String(err) : undefined;
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-x-4 gap-y-2 max-md:text-sm xs:gap-x-10 sm:grid-cols-2 sm:gap-y-8 lg:grid-cols-4",
        wrapperClass
      )}
    >
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
          <div className="mt-2.5">
            {/* remove this class */}
            <Select
              label="Suite Type"
              options={["Single", "Double"]}
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
      <div className="relative mt-1 flex items-start max-sm:mt-8">
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
        <div className="absolute -top-7 right-0 w-full max-w-fit md:-top-6 md:max-w-[100px]">
          <Controller
            control={control}
            name={`suites.${idx}.timing`}
            render={({ field: { name, onChange, value } }) => (
              <Select
                options={["Daily", "Weekly", "Monthly"]}
                placeholder="Range"
                onChange={onChange}
                value={value}
                isError={Boolean(getFormError("timing"))}
                listbox-name={name}
                btnClassName="text-xs p-2"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SuiteInfoInputRow;
