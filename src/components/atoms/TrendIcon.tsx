import { cn } from "@/utils";
import { IconBox } from "@the_human_cipher/components-library";

interface TrendIconProps {
  positive?: boolean;
  className?: string;
  iconSize?: number;
}

export const TrendIcon = ({ positive = false, className, iconSize }: TrendIconProps) => {
  return (
    <figure
      className={cn(
        positive ? "bg-light-green text-primary" : "bg-[#FCD0D0] text-borderNegative",
        "grid h-8 w-8 place-items-center rounded-full",
        className
      )}
    >
      <IconBox
        icon="ArrowNarrowDownLeft"
        className={positive ? "-scale-100" : undefined}
        size={iconSize}
      />
    </figure>
  );
};
