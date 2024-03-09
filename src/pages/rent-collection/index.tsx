import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useGetAllRentHistory } from "@/utils/hooks/api/rent-history";
import { FaviconLoader } from "@/components/atoms/Loader";
import Link from "next/link";
import { TableRow } from "@/components/atoms/blocks";
import Tabs from "@/components/organisms/Tabs";
import {
  StripeRentCollectionTab,
  RentHistoryHeader,
  ManualRentCollectionTab,
} from "@/components/molecules/rent-collection";

const tabHeader = [
  { name: "From", className: "" },
  { name: "Amount", className: "" },
  { name: "Date", className: "" },
  { name: "Status", className: "" },
];

const tabs = ["Stripe Payments", "Manual Payments"];

const TableHeader = () => (
  <TableRow className="rounded-t-lg bg-suite-dark py-4 text-white max-md:hidden">
    {tabHeader.map((tab) => (
      <div key={tab.name}>{tab.name}</div>
    ))}
  </TableRow>
);

const RentCollectionPage = () => {
  const { isLoading, isError, data: rentHistory } = useGetAllRentHistory();

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

  return (
    <DashboardLayout>
      <RentHistoryHeader />
      <div className="max-md:mt-10">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold">Rent History</span>
            <Link
              href="/rent-collection/manual-payment"
              className="underline-offset-3 text-primary underline"
            >
              View Pending Payments
            </Link>
          </div>
        </div>

        <Tabs defaultValue={tabs[0]}>
          <Tabs.Header tablist={tabs} />
          <Tabs.Content value={tabs[0]}>
            <TableHeader />
            <StripeRentCollectionTab />
          </Tabs.Content>
          <Tabs.Content value={tabs[1]}>
            <TableHeader />
            <ManualRentCollectionTab />
          </Tabs.Content>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default RentCollectionPage;
