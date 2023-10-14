import Icons from "@/assets/icons";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import MaintenanceRequestTable from "@/components/molecules/MiantennanceRequestTable";
import RentHistorySidebar from "@/components/molecules/RentHistory";
import { DashboardDoughNutChart } from "@/components/organisms/DashboardCharts";
import { IconBox, Title } from "@the_human_cipher/components-library";

interface CardProps {
  title: string;
  value: number | string;
}

const Card = ({ title, value }: CardProps) => (
  <div>
    <span className="text-sm">{title}</span>
    <h4 className="text-4xl font-bold text-primary">{value}</h4>
  </div>
);

const HomePage = () => {
  return (
    <DashboardLayout>
      <div className="mb-8 flex gap-4">
        <div className="grid w-full grid-cols-2 gap-4">
          <div className="flex items-center justify-between gap-2 rounded-3xl bg-light-gray p-4">
            <div className="space-y-4">
              <Card title="Vacant Spaces" value={10} />
              <Card title="Occupied Spaces" value={12} />
            </div>
            <div className="h-[180px] w-[180px]">
              <DashboardDoughNutChart />
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-3xl bg-light-gray p-4">
            <div className="flex items-center gap-2">
              <span>{Icons.MaintenanceGreen}</span>
              <Title level={5} weight="bold">
                Maintenance Request{" "}
              </Title>
            </div>
            <div className="grid grid-cols-2 gap-2">
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
        </div>
        <div className="w-full max-w-[365px] rounded-3xl bg-light-gray">
          <p>hello world</p>
        </div>
      </div>
      <div className="flex gap-4">
        <MaintenanceRequestTable />
        <aside className="w-full max-w-[365px] rounded-3xl bg-light-gray p-3 xl:p-6">
          <RentHistorySidebar />
        </aside>
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
