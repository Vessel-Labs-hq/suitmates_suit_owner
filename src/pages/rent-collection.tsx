import DashboardLayout from "@/components/layouts/DashboardLayout";
import MissedRentSideBar, {
  RentBentoWrapper,
} from "@/components/molecules/MissedRentSideBar";
import { Label, Select } from "@the_human_cipher/components-library";
import { SortOptions } from "@/constants";
import {
  useGetAllRentHistory,
  useGetRentChartHistory,
} from "@/utils/hooks/api/rent-history";
import { FaviconLoader } from "@/components/atoms/Loader";
import { MissedRentHistoryChart } from "@/components/organisms/RentHistoryChart";
import { cn, formatNumberToCurrency } from "@/utils";
import dayjs from "dayjs";
import { TrendIcon } from "@/components/atoms/TrendIcon";
import EmptyScreen from "@/components/molecules/EmptyScreen";

const TableRow = ({ children, className }: IProps) => {
  return (
    <div className={cn("grid grid-cols-4 gap-2 p-2 py-3 text-center", className)}>
      {children}
    </div>
  );
};

const Tablist = [
  { name: "From", className: "" },
  { name: "Amount", className: "" },
  { name: "Date", className: "" },
  { name: "Status", className: "" },
];

const RentCollectionPage = () => {
  const { isLoading, isError, data: rentHistory } = useGetAllRentHistory();

  const { data } = useGetRentChartHistory();

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

  if (isError && !data) {
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
                <span className="text-2xl font-bold text-[#3BAF75]">
                  {data?.yearly
                    ? `$${(data?.yearly?.[2023] ?? "")?.toLocaleString()}`
                    : "--"}
                </span>
              </div>

              <div className="h-64 w-full">
                <MissedRentHistoryChart />
              </div>
            </div>
          </RentBentoWrapper>
        </div>

        {false && <MissedRentSideBar length={4} />}
      </div>

      <div className="max-md:mt-10">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold">Rent History</span>
            {false && (
              <Select
                placeholder="This Month"
                btnClassName="p-2 h-[40px] w-full rounded-md max-md:h-auto max-md:[&_svg]:hidden max-md:py-1"
                options={SortOptions}
                wrapperClassName="md:w-24 xxl:w-28 text-[10px] md:text-xs lg:text-sm"
                optionClassName="max-md:p-2"
              />
            )}
          </div>
        </div>
        <TableRow className="rounded-t-lg bg-suite-dark py-4 text-white max-md:hidden">
          {Tablist.map((tab) => (
            <div key={tab.name}>{tab.name}</div>
          ))}
        </TableRow>
        <div className="space-y-3">
          {rentHistory && rentHistory.length > 0 ? (
            rentHistory.map(({ dateOfPayment, amount, status, paid, suiteNumber }) => {
              return (
                <TableRow
                  key={dateOfPayment}
                  className="grid-cols-3 items-center bg-[#F8F8FC] md:grid-cols-4"
                >
                  <div className="mx-auto flex w-full items-center gap-2 max-md:mr-auto max-xs:text-sm md:relative md:w-full md:justify-center md:pl-6">
                    <div className="left-0 md:absolute">
                      <TrendIcon positive={paid} />
                    </div>
                    <p className="">Suite {suiteNumber}</p>
                  </div>
                  <div>
                    <p
                      className={cn(
                        "font-bold max-xs:text-sm",
                        !paid ? "text-borderNegative" : "text-primary"
                      )}
                    >
                      {formatNumberToCurrency(amount, "USD")}
                    </p>
                    <p className="whitespace-nowrap text-[11px] md:hidden">
                      {/* Jan 13, 2022 23:21 */}
                      {dayjs(dateOfPayment).format("MMM D, YYYY h:mm A")}
                    </p>
                  </div>
                  <p className="hidden whitespace-nowrap md:block">
                    {dayjs(dateOfPayment).format("MMM D, YYYY h:mm A")}
                  </p>
                  <div className="ml-auto w-fit md:mx-auto">
                    <Label
                      className="h-8 px-4 capitalize max-sm:hidden md:text-base"
                      type={!paid ? "danger" : "success"}
                      label={status}
                      dots
                    />
                    <Label
                      className="h-8 max-w-fit px-4 capitalize max-sm:px-2 max-sm:py-1 sm:hidden md:text-base"
                      type={!paid ? "danger" : "success"}
                      label={status}
                      dots
                      small
                    />
                  </div>
                </TableRow>
              );
            })
          ) : (
            <EmptyScreen
              title="No rent record"
              desc="You are yet to make any rent payment"
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RentCollectionPage;
