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
import { useGetAllMaintenance } from "@/utils/hooks/api/maintenance";
import { FaviconLoader } from "@/components/atoms/Loader";
import { useGetAllAnalyzedSpaceData } from "@/utils/hooks/api/useGetSpace";
import { useGetAllRentHistory } from "@/utils/hooks/api/rent-history";

const HomePage = () => {
  const { data, isLoading, isError } = useGetAllMaintenance();

  const { data: analyzedData } = useGetAllAnalyzedSpaceData();

  const { data: rentHistory, isLoading: isLoadingRent } = useGetAllRentHistory();

  if (isLoading) {
    return (
      <DashboardLayout headerDesc="Track maintenance on your dashboard ">
        <div className="grid h-[500px] place-items-center">
          <div>
            <FaviconLoader />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout headerDesc="Track maintenance on your dashboard ">
        <div>Oops an error occurred</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 md:mb-8 md:flex-row">
        <div className="grid w-full grid-cols-1 gap-4 max-xl:items-center xxl:grid-cols-2">
          <HomeBentoWrapper className="xxl:min-h-[190px]">
            <div className="space-y-2 xxl:space-y-4">
              <HomeInfoCard
                title="Vacant Spaces"
                value={analyzedData?.totalVacantSuites ?? "N/A"}
              />
              <HomeInfoCard
                title="Occupied Spaces"
                value={analyzedData?.totalOccupiedSuites ?? "N/A"}
              />
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
                <HomeInfoCard
                  title="Total Requests"
                  value={data?.totalMaintenanceRequests ?? "N/A"}
                />
                <HomeInfoCard
                  title="Pending Requests"
                  value={data?.pendingMaintenanceRequests ?? "N/A"}
                />
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
      <div className="flex flex-col items-start gap-4 xl:flex-row">
        <MaintenanceRequestTable maintenanceRequests={data?.maintenanceRequests} />
        <SidebarElement className="rounded-3xl">
          <RentHistorySidebar rentHistory={rentHistory} isFetching={isLoadingRent} />
        </SidebarElement>
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
