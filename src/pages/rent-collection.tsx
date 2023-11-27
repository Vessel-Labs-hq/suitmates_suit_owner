import { HomeBentoWrapper, HomeRentGraph } from "@/components/atoms/HomeSharedUI";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import MissedRentSideBar from "@/components/molecules/MissedRentSideBar";
import { MissedRentHistoryChart } from "@/components/organisms/DashboardCharts";
import { Select, Title } from "@the_human_cipher/components-library";
import { SortOptions } from "@/constants";
import RentHistoryTable from "@/components/molecules/MissedRentSideBar/RentTable";

const RentCollectionPage = () => (
  <DashboardLayout>
    <div className="flex flex-col gap-4 md:mb-8 md:flex-row">
      <div className="w-full">
        <HomeBentoWrapper>
          <div className="w-full">
            <div className="flex flex-col">
              <span>Total Income</span>
              <span className="text-2xl font-bold text-[#3BAF75]">$ 350,007.89</span>
            </div>

            <div className="h-64 w-full">
              <MissedRentHistoryChart />
            </div>
          </div>
        </HomeBentoWrapper>

        <div className="mt-4">
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

      <MissedRentSideBar />
    </div>

    <RentHistoryTable />
  </DashboardLayout>
);

export default RentCollectionPage;
