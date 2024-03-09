import {
  useGetAllRentHistory,
  useGetManualRentUpload,
  useGetRentChartHistory,
} from "@/utils/hooks/api/rent-history";
import { RentBentoWrapper } from "../MissedRentSideBar";
import { cn, formatNumberToCurrency, sortMonthlyRentDataset } from "@/utils";
import { RentHistoryTableRow } from "../RentHistoryTableRow";
import EmptyScreen from "../EmptyScreen";
import { MissedRentHistoryChart } from "@/components/organisms/RentHistoryChart";
import { FaviconLoader, SpinnerLoader } from "@/components/atoms/Loader";
import { Fragment } from "react";

export const StripeRentCollectionTab = () => {
  const { isLoading, data: rentHistory } = useGetAllRentHistory();

  if (isLoading) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <SpinnerLoader className="text-primary" />;
      </div>
    );
  }

  if (!rentHistory) {
    return <p>An error occurred getting rent history</p>;
  }

  return (
    <div className="space-y-3">
      {rentHistory.length > 0 ? (
        rentHistory.map((record) => {
          return <RentHistoryTableRow {...record} key={record.dateOfPayment} />;
        })
      ) : (
        <EmptyScreen title="No rent record" desc="You are yet to make any rent payment" />
      )}
    </div>
  );
};

export const ManualRentCollectionTab = () => {
  const { isLoading, data: manualRent } = useGetManualRentUpload();

  if (isLoading) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <SpinnerLoader className="text-primary" />;
      </div>
    );
  }

  if (!manualRent) {
    return <p>An error occurred getting manual rent history</p>;
  }

  const { suite: suites } = manualRent.space;

  return (
    <div className="space-y-3">
      {suites.map((suite) => {
        const { manual_payments } = suite.tenant;

        const pendingPayments = manual_payments.filter(
          (record) => record.status !== "pending"
        );

        if (pendingPayments.length < 1) return <Fragment key={suite.id}></Fragment>;

        return pendingPayments.map((record) => {
          return (
            <RentHistoryTableRow
              key={record.id}
              amount={Number(record.amount)}
              dateOfPayment={record.created_at}
              paid={record.status === "approved"}
              status={record.status}
              suiteNumber={suite.suite_number}
            />
          );
        });
      })}
    </div>
  );
};

export const RentHistoryHeader = () => {
  const { data, isError, isLoading } = useGetRentChartHistory();

  if (isError) {
    return (
      <div>
        <p>Oops an error occurred</p>
      </div>
    );
  }

  const getMonthlyRent = () => {
    if (!data?.monthly) return "$0";

    const { values } = sortMonthlyRentDataset(data.monthly);

    const total = values.reduce((acc, curr) => {
      return acc + curr;
    }, 0);

    return formatNumberToCurrency(total, "USD");
  };

  return (
    <div className="flex gap-x-8 md:mb-8">
      <div className="w-full">
        <RentBentoWrapper>
          <div className="h-80 w-full">
            <div className="flex flex-col">
              <span>Total Income(All Time)</span>
              <span
                className={cn(
                  "text-2xl font-bold text-[#3BAF75]",
                  (!data || isLoading) && "opacity-0"
                )}
              >
                {getMonthlyRent()}
              </span>
            </div>

            <div className="h-64 w-full">
              {isLoading ? (
                <div className="grid h-full place-items-center">
                  <FaviconLoader />
                </div>
              ) : data ? (
                <MissedRentHistoryChart data={data} />
              ) : (
                <p>An error occurred while getting chart</p>
              )}
            </div>
          </div>
        </RentBentoWrapper>
      </div>
    </div>
  );
};
