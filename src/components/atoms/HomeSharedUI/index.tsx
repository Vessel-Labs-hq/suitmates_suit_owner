import { DashboardRentHistoryChart } from "@/components/organisms/DashboardCharts";
import { cn } from "@/utils";
import { useGetRentChartHistory } from "@/utils/hooks/api/rent-history";
import { IconBox, Title } from "@the_human_cipher/components-library";

export const HomeBentoWrapper = ({ children, className }: IProps) => (
  <div
    className={cn(
      "relative flex items-center justify-between gap-2 rounded-2xl bg-light-gray p-4 max-xxl:py-2 xxl:rounded-3xl",
      "max-xxl:h-[150px]",
      className
    )}
  >
    {children}
  </div>
);

interface HomeInfoCard {
  title: string;
  value: number | string;
}

export const HomeInfoCard = ({ title, value }: HomeInfoCard) => (
  <div>
    <span className="whitespace-nowrap text-xs xxl:text-sm">{title}</span>
    <h4 className="text-2xl font-bold text-primary xxl:text-4xl">{value}</h4>
  </div>
);

export const HomeRentGraph = () => {
  const { data } = useGetRentChartHistory();

  if (!data?.yearly) {
    return;
  }

  const { yearly } = data;

  return (
    <div className="flex w-full flex-col rounded-2xl bg-[#3BAF75] px-3 py-2 md:max-w-[350px] xxl:space-y-3 xxl:rounded-3xl">
      <div className="flex items-center gap-2">
        <div className="flex w-fit items-center justify-center rounded-full bg-light-green p-1 text-primary">
          <IconBox icon="CurrencyDollarCircle" size={26} className="translate-y-[1px]" />
        </div>
        <Title level={4} className="text-white" weight="bold">
          Rent Paid this
        </Title>
      </div>
      <h2 className="mt-1 text-xl font-bold text-white md:text-4xl xxl:text-center">
        {`$${yearly[2023].toLocaleString()}`}
      </h2>
      <div className="mt-auto h-20 min-h-[100px] w-full max-xxl:mt-3 md:h-full xxl:h-[100px]">
        <DashboardRentHistoryChart />
      </div>
    </div>
  );
};

export const SidebarElement = ({ children, className }: IProps) => (
  <aside
    className={cn(
      "sticky top-4 w-full rounded-2xl bg-light-gray p-3 max-xl:hidden xl:max-w-[350px] xl:p-6",
      className
    )}
  >
    {children}
  </aside>
);
