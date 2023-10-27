import { HomeInfoCard } from "@/components/atoms/HomeSharedUI";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import DueRequestSideBar from "@/components/molecules/DueRequestSideBar";
import TenantDetailCard from "@/components/molecules/TenantDetailCard";
import AddTenantModal from "@/components/organisms/AddTenantModal";
import { DashboardSuiteInfoChart } from "@/components/organisms/DashboardCharts";
import { DummyMaintenanceData } from "@/constants";
import { assertQuery } from "@/utils";
import { Button, IconBox, Title } from "@the_human_cipher/components-library";
import Link from "next/link";
import { useRouter } from "next/router";

const TenantPage = () => {
  const router = useRouter();

  const { add_tenant } = router.query;

  const handleClose = () => router.push({ query: {} });

  return (
    <DashboardLayout>
      <main>
        <section className="flex items-start justify-between gap-4">
          <div className="flex h-full w-full flex-col gap-4">
            <div className="grid max-h-44 w-full grid-cols-3 items-center gap-4 rounded-xl bg-light-gray p-6">
              <HomeInfoCard title="Vacant Suites" value={10} />
              <HomeInfoCard title="Occupied Suites" value={12} />
              <DashboardSuiteInfoChart />
            </div>
            <div className="mt-auto w-fit">
              <div className="flex items-center gap-4">
                <Button asChild className="flex items-center gap-2 px-3">
                  <Link href={{ query: { add_tenant: true } }}>
                    <IconBox icon="Plus" />
                    <span className="whitespace-nowrap">Add Tenant</span>
                  </Link>
                </Button>
                <Button asChild className="flex items-center gap-2 px-3">
                  <Link href="#">
                    <IconBox icon="Edit05" />
                    <span>Edit Suite</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <DueRequestSideBar length={3} />
        </section>
        <section className="mt-6">
          <Title level={4} weight="bold" className="text-lg text-black">
            All Tenants
          </Title>

          <div className="mt-4 space-y-4">
            {[...DummyMaintenanceData, ...DummyMaintenanceData].map((n, idx) => (
              <TenantDetailCard
                key={idx}
                onRemove={() => {
                  console.log("removed");
                }}
                onSuiteChange={() => {
                  console.log("suite changed");
                }}
                href={"#"}
                status={idx % 2 === 0 ? "paid" : "due"}
              />
            ))}
          </div>
        </section>
      </main>

      {assertQuery(add_tenant) && (
        <AddTenantModal open onOpenChange={handleClose} onTenantAdded={handleClose} />
      )}
    </DashboardLayout>
  );
};

export default TenantPage;
