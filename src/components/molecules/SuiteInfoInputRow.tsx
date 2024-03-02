import { InferSchema } from "@/utils/schema/helpers";
import { SuiteDetailSchema, SuiteInfoSchema } from "@/utils/schema/details";
import { Input, Select } from "@the_human_cipher/components-library";
import { Control, Controller, FormState, UseFormRegister } from "react-hook-form";
import { cn } from "@/utils";

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
    label: "Suite Size(Length)",
    name: "suite_size_length",
    placeholder: "Enter width",
  },
  {
    label: "Suite Size(Breadth)",
    name: "suite_size_breadth",
    placeholder: "Enter length",
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
        "w-full justify-between gap-4 gap-y-7 space-y-2 sm:space-y-5 lg:flex lg:space-y-0 lg:pt-5",
        wrapperClass
      )}
    >
      {[fields[0]].map(({ name, label, ...ele }) => (
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
      <div className="grid grid-cols-1 gap-4 xxs:grid-cols-2">
        {[fields[1], fields[2]].map(({ name, label, ...ele }) => (
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
      <Controller
        control={control}
        name={`suites.${idx}.suite_type`}
        render={({ field: { name, onChange, value } }) => (
          <div className="mt-2.5 min-w-[200px]">
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
      <div className="relative flex items-start  max-lg:pt-10">
        <Controller
          name={`suites.${idx}.suite_cost`}
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <div className="w-full">
                {[fields[3]].map(({ name, label, ...ele }) => (
                  <Input
                    {...ele}
                    key={name}
                    label={label}
                    className="py-3"
                    {...register(`suites.${idx}.${name}`)}
                    value={value}
                    onChange={onChange}
                    hint={getFormError(name)}
                    isError={Boolean(getFormError(name))}
                  />
                ))}
              </div>
            );
          }}
        />
        <div className="absolute right-0 top-3 w-full max-w-fit md:max-w-[100px] lg:-top-6">
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
