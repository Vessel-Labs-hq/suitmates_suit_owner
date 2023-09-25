import { cn } from "@/utils";
import ReactSelect, { type Props as RProps } from "react-select";

type StringNum = string | number;

type Options = {
  value: StringNum;
  label: StringNum;
};

type SelectProps = Omit<RProps, "options"> & {
  data: Options[];
  hint?: string;
  isError?: boolean;
  label: string;
};

const Select = (props: SelectProps) => {
  const { data, hint, isError, label, ...prop } = props;

  return (
    <div className={cn("grid grid-cols-1 gap-1 text-base", props.className)}>
      <label>{label}</label>
      <ReactSelect
        options={data}
        {...prop}
        classNames={{
          control: (state) =>
            cn(
              "h-[48px] rounded-lg border-2 border-[#D9D9D9] bg-[#D9D9D9] px-4 text-[#757575]",
              state.isFocused && "border-black text-black",
              state.hasValue && "text-black",
              isError && "border-dark-red border-2"
            ),
          valueContainer: (style) => "flex gap-1 !flex-nowrap overflow-x-auto",
          input: (state) => "flex items-center cursor-pointer",
          menu: () =>
            "bg-white rounded-xl mt-1 shadow-[0px_4px_16px_0px_rgba(0,_0,_0,_0.12)] overflow-hidden",
          menuList: (state) => "",
          option: (state) =>
            cn(
              "px-4 py-2",
              state.isFocused && "cursor-pointer bg-[#D9D9D9] text-black"
            ),
          noOptionsMessage: (state) => `py-3`,
          ...props.classNames,
        }}
        classNamePrefix="sm"
        unstyled
        isSearchable={props.isSearchable ?? false}
      />
      <div
        className={cn(
          "mt-1 max-h-0 text-sm text-[#757575]",
          "transition-all duration-300 ease-out",
          hint && "max-h-[300px]"
        )}
      >
        {hint}
      </div>
    </div>
  );
};

export default Select;
