import { IconBox, Title } from "@the_human_cipher/components-library";
import style from "./Cards.module.scss";
import { cn } from "@/utils";

type Icon = ComponentProps<typeof IconBox>["icon"];

interface Props {
  title: string;
  icon?: Icon | React.ReactNode;
  percentage: string | number;
  isDecline?: boolean;
  value: string | number;
  className?: string;
}

const HomeBento = (props: Props) => {
  const { percentage, value, icon, title, isDecline, className } = props;

  return (
    <div className={cn("@desktop:p-6 rounded-3xl bg-light-gray p-3", className)}>
      <div className="flex items-center justify-between gap-4">
        <div className="grid grid-cols-1 gap-3">
          <Title level={3} weight="light" className="whitespace-nowrap text-base">
            {title}
          </Title>
          <Title weight="bold" className="text-5xl text-primary">
            {value}
          </Title>
          <div className="flex items-center gap-2 text-[11px]">
            <div className="flex items-center justify-between gap-1 rounded-full bg-light-green p-1 px-2.5 text-[11px] leading-normal text-primary">
              <IconBox size={14} icon="TrendUp01" />
              <span className="font-bold">{percentage}</span>
            </div>
            <span className="whitespace-nowrap">from last month</span>
          </div>
        </div>
        <div className="@desktop:p-[18px] rounded-full bg-light-green p-3">
          {typeof icon === "string" ? (
            <IconBox size={54} className="text-primary" icon={icon as Icon} />
          ) : (
            <span className={cn(style.custom_icon)}>{icon}</span> // check css file for styling
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeBento;
