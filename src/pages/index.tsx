import Icons from "@/assets/icons";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import MaintenanceRequestTable from "@/components/molecules/MiantennanceRequestTable";
import RentHistorySidebar from "@/components/molecules/RentHistory";
import {
  DashboardRentHistoryChart,
  DashboardSuiteInfoChart,
} from "@/components/organisms/DashboardCharts";
import { IconBox, Title } from "@the_human_cipher/components-library";
import { ClassValues, cn } from "@/utils";

interface CardProps {
  title: string;
  value: number | string;
}

const Card = ({ title, value }: CardProps) => (
  <div>
    <span className="whitespace-nowrap text-xs xxl:text-sm">{title}</span>
    <h4 className="text-2xl font-bold text-primary xxl:text-4xl">{value}</h4>
  </div>
);

const BentoWrapper = ({ children, className }: IProps) => (
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

const HomePage = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 md:mb-8 md:flex-row">
        <div className="grid w-full grid-cols-1 gap-4 max-xl:items-center xxl:grid-cols-2">
          <BentoWrapper className="xxl:min-h-[190px]">
            <div className="space-y-2 xxl:space-y-4">
              <Card title="Vacant Spaces" value={10} />
              <Card title="Occupied Spaces" value={12} />
            </div>
            <div className="absolute right-0 top-1/2 mt-1 h-[120px] w-[120px] -translate-x-5 -translate-y-1/2 xxl:h-[180px] xxl:w-[180px] xxl:translate-x-3">
              <DashboardSuiteInfoChart />
            </div>
          </BentoWrapper>
          <BentoWrapper className="flex-col items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="">{Icons.MaintenanceGreen}</span>
              <Title level={5} weight="bold">
                Maintenance Request{" "}
              </Title>
            </div>
            <div className="w-full max-xxl:-mt-1 max-xxl:space-y-1">
              <div className="flex w-full items-center justify-between gap-2">
                <Card title="Total Requests" value={120} />
                <Card title="Pending Requests" value="010" />
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <div className="flex items-center justify-between gap-1 rounded-full bg-light-green p-1 px-2.5 text-[11px] leading-normal text-primary">
                  <IconBox size={14} icon="TrendUp01" />
                  <span className="font-bold">+120%</span>
                </div>
                <span>from last month</span>
              </div>
            </div>
          </BentoWrapper>
        </div>
        <div className="flex w-full flex-col rounded-2xl bg-primary px-3 py-2 md:max-w-[350px] xxl:space-y-3 xxl:rounded-3xl">
          <div className="flex items-center gap-2">
            <div className="flex w-fit items-center justify-center rounded-full bg-light-green p-1 text-primary">
              <IconBox icon="CurrencyDollarCircle" size={26} className="translate-y-[1px]" />
            </div>
            <Title level={4} className="text-white" weight="bold">
              Rent Paid this Month{" "}
            </Title>
          </div>
          <h2 className="mt-1 text-xl font-bold text-white md:text-4xl xxl:text-center">
            $ 350,007.89
          </h2>
          <div className="mt-auto h-20 min-h-[100px] w-full max-xxl:mt-3 md:h-full xxl:h-[100px]">
            <DashboardRentHistoryChart />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 xl:flex-row">
        <MaintenanceRequestTable />
        <aside className="w-full rounded-3xl bg-light-gray p-3 max-xl:hidden xl:max-w-[350px] xl:p-6">
          <RentHistorySidebar />
        </aside>
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
