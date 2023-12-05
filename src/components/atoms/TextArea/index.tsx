import React, { ComponentPropsWithoutRef, useRef, useState } from "react";
// import { InputProps } from "./Input.types";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { cn } from "src/utils";
// import { HintBlock } from "../common/blocks";

export interface InputProps extends ComponentPropsWithoutRef<"textarea"> {
  isLoading?: boolean;
  isError?: boolean;
  isValid?: boolean;
  hint?: string;
  labelClass?: string;
  label?: string;
  wrapperClass?: string;
  handleChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

interface HintProps {
  hint?: string;
  className?: string;
}

export const HintBlock = ({ hint, className }: HintProps) => (
  <div
    className={cn(
      "max-h-0 text-sm text-tertiary-content",
      "transition-all duration-300 ease-out",
      hint && "max-h-[300px]",
      className
    )}
  >
    {hint}
  </div>
);

export const TextArea = React.forwardRef<HTMLTextAreaElement, InputProps>(
  (
    {
      className,
      label,
      labelClass,
      wrapperClass,
      handleChange,
      isError,
      isValid,
      hint,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);

    return (
      <div className={cn("flex flex-col gap-1", wrapperClass)}>
        <label className="flex flex-col gap-1">
          {label && <span className={cn("text-dark", labelClass)}>{label}</span>}
          <textarea
            className={cn(
              "rounded-md border-2 border-tertiary-background bg-tertiary-background",
              "focus:border-2 focus:border-black focus:bg-white",
              "w-full px-4 py-3.5 font-light outline-transparent placeholder:text-input-placeholder focus-visible:outline-none",
              isError && "border-borderNegative",
              isValid && "border-primary bg-white",
              className
            )}
            {...props}
            ref={ref || inputRef}
          />
        </label>
        <HintBlock hint={hint} />
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
