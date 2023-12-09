import { HomeBentoWrapper, HomeRentGraph } from "@/components/atoms/HomeSharedUI";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import MissedRentSideBar, {
  RentBentoWrapper,
} from "@/components/molecules/MissedRentSideBar";
// import { MissedRentHistoryChart } from "@/components/organisms/DashboardCharts";
import { Select, Title } from "@the_human_cipher/components-library";
import { SortOptions } from "@/constants";
import RentHistoryTable from "@/components/molecules/MissedRentSideBar/RentTable";
import {
  useGetAllRentHistory,
  useGetRentChartHistory,
} from "@/utils/hooks/api/rent-history";
import { FaviconLoader } from "@/components/atoms/Loader";
import { MissedRentHistoryChart } from "@/components/organisms/RentHistoryChart";

const RentCollectionPage = () => {
  const { isLoading, isError } = useGetAllRentHistory();

  const { data } = useGetRentChartHistory();

  if (!data?.yearly) {
    return;
  }

  const { yearly } = data;

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
      <div className="flex gap-x-8 md:mb-8">
        <div className="w-full">
          <RentBentoWrapper>
            <div className="h-80 w-full">
              <div className="flex flex-col">
                <span>Total Income</span>
                <span className="text-2xl font-bold text-[#3BAF75]">{`$${yearly[2023].toLocaleString()}`}</span>
              </div>

              <div className="h-64 w-full">
                <MissedRentHistoryChart />
              </div>
            </div>
          </RentBentoWrapper>

          <div className="lg:mt-30 xxs:mb-2 xxs:mt-2 md:mt-12">
            <div className="flex items-center justify-between">
              <span className="text-base font-bold">Rent History</span>
              <Select
                placeholder="This Month"
                btnClassName="p-2 h-[40px] w-full rounded-md max-md:h-auto max-md:[&_svg]:hidden max-md:py-1"
                options={SortOptions}
                wrapperClassName="md:w-24 xxl:w-28 text-[10px] md:text-xs lg:text-sm"
                optionClassName="max-md:p-2"
              />
            </div>
          </div>
        </div>

        <MissedRentSideBar length={6} />
      </div>

      <RentHistoryTable />
    </DashboardLayout>
  );
};

export default RentCollectionPage;
