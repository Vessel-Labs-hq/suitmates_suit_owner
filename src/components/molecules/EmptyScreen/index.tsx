import { IconSlot } from "@/assets/icons";
import { cn } from "@/utils";

type IconType = React.ComponentProps<typeof IconSlot>["icon"];

interface EmptyScreenProps extends IClass {
  icon?: React.ReactNode;
  title: string;
  desc: string;
  style?: Partial<{
    descStyle: string;
    titleStyle: string;
    defaultIconStyle: string;
  }>;
  iconKey?: IconType;
}

const EmptyScreen = (props: EmptyScreenProps) => {
  const { desc, icon, title, className, style, iconKey = "UsersPlus" } = props;

  const { defaultIconStyle, descStyle, titleStyle } = style ?? {};

  return (
    <div
      className={cn(
        "grid place-content-center place-items-center gap-1 rounded-xl bg-light-gray py-14",
        className
      )}
    >
      {icon ? (
        icon
      ) : (
        <IconSlot
          className={cn("h-20 w-20 md:h-36 md:w-36", defaultIconStyle)}
          icon={iconKey}
        />
      )}
      <h4 className={cn("mt-4 text-lg font-bold", titleStyle)}>{title}</h4>
      <p className={cn("mx-auto max-w-[40ch] text-center text-sm", descStyle)}>{desc}</p>
    </div>
  );
};

export default EmptyScreen;
