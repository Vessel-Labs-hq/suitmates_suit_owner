import Icons from "@/assets/icons";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import MaintenanceRequestTable from "@/components/molecules/MiantennanceRequestTable";
import RentHistorySidebar from "@/components/molecules/RentHistory";
import { DashboardSuiteInfoChart } from "@/components/organisms/DashboardCharts";
import { IconBox, Title } from "@the_human_cipher/components-library";
import {
  HomeBentoWrapper,
  HomeInfoCard,
  HomeRentGraph,
  SidebarElement,
} from "@/components/atoms/HomeSharedUI";

const HomePage = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 md:mb-8 md:flex-row">
        <div className="grid w-full grid-cols-1 gap-4 max-xl:items-center xxl:grid-cols-2">
          <HomeBentoWrapper className="xxl:min-h-[190px]">
            <div className="space-y-2 xxl:space-y-4">
              <HomeInfoCard title="Vacant Spaces" value={10} />
              <HomeInfoCard title="Occupied Spaces" value={12} />
            </div>
            <div className="absolute right-0 top-1/2 mt-1 h-[120px] w-[120px] -translate-x-5 -translate-y-1/2 xxl:h-[180px] xxl:w-[180px] xxl:translate-x-3">
              <DashboardSuiteInfoChart />
            </div>
          </HomeBentoWrapper>
          <HomeBentoWrapper className="flex-col items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="">{Icons.MaintenanceGreen}</span>
              <Title level={5} weight="bold">
                Maintenance Request
              </Title>
            </div>
            <div className="w-full max-xxl:-mt-1 max-xxl:space-y-1">
              <div className="flex w-full items-center justify-between gap-2">
                <HomeInfoCard title="Total Requests" value={120} />
                <HomeInfoCard title="Pending Requests" value="010" />
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <div className="flex items-center justify-between gap-1 rounded-full bg-light-green p-1 px-2.5 text-[11px] leading-normal text-primary">
                  <IconBox size={14} icon="TrendUp01" />
                  <span className="font-bold">+120%</span>
                </div>
                <span>from last month</span>
              </div>
            </div>
          </HomeBentoWrapper>
        </div>
        <HomeRentGraph />
      </div>
      <div className="flex flex-col gap-4 xl:flex-row">
        <MaintenanceRequestTable />
        <SidebarElement className="rounded-3xl">
          <RentHistorySidebar />
        </SidebarElement>
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
