import React, { createContext, useContext } from "react";
// import * as RadixProgress from "@radix-ui/react-progress";
import { AiOutlineCheck } from "react-icons/ai";
import { cn } from "@/utils";

interface ClassProps {
  /** className for the wrapper */
  wrapperClass?: string;
  /** className for the indicator */
  className?: string;
}

interface DefaultProps {
  currentStep: number;
  steps: number;
}

type Props = ClassProps & DefaultProps;

const StepContext = createContext<DefaultProps>({
  currentStep: 1,
  steps: 1,
});

interface IStepProgressIndicator extends DefaultProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * https://devrecipes.net/step-progres-bar-with-pure-css/
 */
export const StepProgressIndicator = (props: IStepProgressIndicator) => {
  const { children, className, steps, currentStep } = props;

  return (
    <StepContext.Provider value={{ currentStep, steps }}>
      <div className={cn("relative flex justify-between", className)}>
        {children}
      </div>
    </StepContext.Provider>
  );
};

interface IStepItem extends Omit<ClassProps, "wrapperClass"> {
  step: number;
  children: React.ReactNode;
  counterClass?: string;
}

const Counter = ({ className, step }: IClass & { step: number }) => {
  const { currentStep } = useContext(StepContext);

  const active = step <= currentStep;

  const completed = step < currentStep;

  return (
    <div
      className={cn(
        "relative z-[3] flex h-9 w-9 items-center justify-center rounded-full font-medium text-white",
        active ? "bg-primary" : "bg-[#D9D9D9]",
        className
      )}
    >
      {completed ? <AiOutlineCheck size={16} /> : step}
    </div>
  );
};

const StepItem = (props: IStepItem) => {
  const { children, className, step, counterClass } = props;
  const { currentStep } = useContext(StepContext);

  const completed = step < currentStep;

  return (
    <div
      className={cn(
        "relative flex-1",
        "before:absolute before:-left-1/2 before:top-[18px] before:w-full before:border-[1px] before:border-[#D9D9D9] first-of-type:before:border-0",
        "after:absolute after:left-1/2 after:top-[18px] after:w-0 after:border-[1px] after:border-[#D9D9D9] last-of-type:after:border-0",
        "after:w-full after:origin-left after:transition-all after:duration-300",
        completed && "after:z-[2] after:border-primary",
        className
      )}
    >
      <Counter step={step} className={counterClass} />
      {children}
    </div>
  );
};

StepProgressIndicator.Item = StepItem;
