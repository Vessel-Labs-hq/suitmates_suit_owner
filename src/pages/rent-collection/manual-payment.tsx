import { FaviconLoader } from "@/components/atoms/Loader";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { ManualPaymentTenantRow } from "@/components/molecules/ManualPaymentTenantRow";
import { cn } from "@/utils";
import { useGetManualRentUpload } from "@/utils/hooks/api/rent-history";

const header = ["Tenant", "Payment Info", "Image", "Actions"];

const HeaderDesc = "View and manage all manual tenant payments";

const Page = () => {
  const { data: manualRent, isLoading } = useGetManualRentUpload();

  if (isLoading || !manualRent)
    return (
      <DashboardLayout headerDesc={HeaderDesc}>
        <div className="grid h-[70vh] place-items-center">
          <FaviconLoader />
        </div>
      </DashboardLayout>
    );

  const { suite: suites } = manualRent.space;

  return (
    <DashboardLayout headerDesc={HeaderDesc}>
      {suites.map((suite) => {
        const { manual_payments, ...tenant } = suite.tenant;

        return (
          <div className="space-y-2" key={suite.id}>
            <div className="flex justify-between text-lg font-bold">
              <p>Suite {suite.suite_number}</p>
              <p>
                ${suite.suite_cost}/{suite.timing}
              </p>
            </div>
            {manual_payments.map((record) => {
              return (
                <ManualPaymentTenantRow
                  key={record.id}
                  user={{
                    name: cn(tenant.first_name, tenant.last_name),
                    avatar: tenant.avatar,
                  }}
                  payment={record}
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
