import { MaintenanceQueries, SortOptions } from "@/constants";
import { cn } from "@/utils";
import { Select, Title } from "@the_human_cipher/components-library";
import Link from "next/link";

interface Props {}

const MaintenanceRequestActionRow = (props: Props) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-1 sm:flex-row",
        "sm:items-center md:items-start md:gap-4"
      )}
    >
      <Title level={3} weight="bold" className="text-xs sm:text-base">
        Your maintenance request
      </Title>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 sm:gap-3">
          <p className="whitespace-nowrap text-[10px] md:text-xs xxl:text-sm">Sort by</p>
          <Select
            placeholder="Date.."
            btnClassName="p-2 h-[40px] w-full rounded-md max-md:h-auto max-md:[&_svg]:hidden max-md:py-1"
            options={SortOptions}
            wrapperClassName="md:w-24 xxl:w-28 text-[10px] md:text-xs lg:text-sm"
            optionClassName="max-md:p-2"
          />
        </div>
      </div>
    </div>
  );
};

export default MaintenanceRequestActionRow;
