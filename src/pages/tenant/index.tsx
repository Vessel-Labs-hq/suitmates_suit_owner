import { HomeInfoCard } from "@/components/atoms/HomeSharedUI";
import NotificationUI from "@/components/atoms/NotificationUI";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import DueRequestSideBar from "@/components/molecules/DueRequestSideBar";
import TenantDetailCard from "@/components/molecules/TenantDetailCard";
import { DashboardSuiteInfoChart } from "@/components/organisms/DashboardCharts";
import { DummyMaintenanceData } from "@/constants";
import { Button, IconBox, Title } from "@the_human_cipher/components-library";
import Link from "next/link";

const TenantPage = () => {
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
                  <Link href="#">
                    <IconBox icon="Plus" />
                    <span>Add Tenant</span>
                  </Link>
                </Button>
                <Button asChild className="flex items-center gap-2 px-3">
                  <Link href="#">
                    <IconBox icon="Edit05" />
                    <span>Add Tenant</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <DueRequestSideBar length={3} />
        </section>
        <section className="mt-6">
          <Title level={4} weight="bold" className=" text-black">
            All Tenants
          </Title>

          {[...DummyMaintenanceData, ...DummyMaintenanceData].map((n, idx) => (
            <TenantDetailCard key={idx} />
          ))}
        </section>
      </main>
    </DashboardLayout>
  );
};

export default TenantPage;
