import { FaviconLoader } from "@/components/atoms/Loader";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import EmptyScreen from "@/components/molecules/EmptyScreen";
import { ManualPaymentTenantRow } from "@/components/molecules/ManualPaymentTenantRow";
import { cn } from "@/utils";
import { useGetManualRentUpload } from "@/utils/hooks/api/rent-history";
import { IconBox } from "@the_human_cipher/components-library";
import { Fragment } from "react";

const hasPendingPayments = (manual_payments: DbGetManualPaymentsManualPayment[]) => {
  return manual_payments.some((record) => record.status === "pending");
};

const HeaderDesc = "View and manage all pending manual tenant payments";

const Page = () => {
  const { data: manualRent, isLoading, refetch } = useGetManualRentUpload();

  if (isLoading || !manualRent)
    return (
      <DashboardLayout headerDesc={HeaderDesc}>
        <div className="grid h-[70vh] place-items-center">
          <FaviconLoader />
        </div>
      </DashboardLayout>
    );

  const { suite: suites } = manualRent.space;

  const isEmpty = suites.filter((suite) => {
    const isPending = suite.tenant.manual_payments.some(
      (record) => record.status === "pending"
    );
    return isPending;
  });

  if (isEmpty)
    return (
      <DashboardLayout headerDesc={HeaderDesc}>
        <EmptyScreen
          className="h-[70vh]"
          title="You are all caught up"
          icon={
            <IconBox
              icon="FileAttachment04"
              className="-mb-4 h-20 w-20 text-dark200/30 md:h-28 md:w-28"
            />
          }
          desc="New manual records would appear here when tenants upload any payment"
        />
      </DashboardLayout>
    );

  return (
    <DashboardLayout headerDesc={HeaderDesc}>
      {suites.map((suite) => {
        const { manual_payments, ...tenant } = suite.tenant;

        const pendingPayments = manual_payments.filter(
          (record) => record.status === "pending"
        );

        if (pendingPayments.length < 1) return <Fragment key={suite.id}></Fragment>;

        return (
          <div className="space-y-2" key={suite.id}>
            <div className="flex justify-between text-lg font-bold">
              <p>Suite {suite.suite_number}</p>
              <p>
                ${suite.suite_cost}/{suite.timing}
              </p>
            </div>
            {pendingPayments.map((record) => {
              return (
                <ManualPaymentTenantRow
                  key={record.id}
                  user={{
                    name: cn(tenant.first_name, tenant.last_name),
                    avatar: tenant.avatar,
                  }}
                  payment={record}
                  refetch={refetch}
                />
              );
            })}
          </div>
        );
      })}
    </DashboardLayout>
  );
};

export default Page;
