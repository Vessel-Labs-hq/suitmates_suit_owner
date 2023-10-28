import { HomeInfoCard } from "@/components/atoms/HomeSharedUI";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import DueRequestSideBar from "@/components/molecules/DueRequestSideBar";
import TenantDetailCard from "@/components/molecules/TenantDetailCard";
import AddTenantModal from "@/components/organisms/AddTenantModal";
import { DashboardSuiteInfoChart } from "@/components/organisms/DashboardCharts";
import { DummyMaintenanceData } from "@/constants";
import { assertQuery, cn, localLog } from "@/utils";
import { useGetProfile } from "@/utils/hooks/api/useGetProfile";
import { Button, IconBox, Title } from "@the_human_cipher/components-library";
import Link from "next/link";
import { useRouter } from "next/router";
import { UrlObject } from "url";

interface IconButtonProps {
  href: string | UrlObject;
  icon: React.ComponentProps<typeof IconBox>["icon"];
  text: string;
  className?: string;
}

const IconButton = ({ href, icon, text, className }: IconButtonProps) => (
  <Button asChild className={cn("flex items-center gap-2 px-3", className)}>
    <Link href={href}>
      <IconBox icon={icon} />
      <span className="whitespace-nowrap">{text}</span>
    </Link>
  </Button>
);

const TenantPage = () => {
  const router = useRouter();

  const { add_tenant } = router.query;

  const { data: profile } = useGetProfile();

  localLog(profile);

  const handleClose = () => router.push({ query: {} });

  return (
    <DashboardLayout>
      <main>
        <section className="flex items-start justify-between gap-4">
          <div className="flex h-full w-full flex-col gap-4">
            <div className="grid max-h-44 w-full grid-cols-2 items-center gap-4 rounded-xl bg-light-gray p-6 md:grid-cols-3">
              <div className="grid grid-cols-1 gap-4 md:col-span-2 md:grid-cols-2">
                <HomeInfoCard title="Vacant Suites" value={10} />
                <HomeInfoCard title="Occupied Suites" value={12} />
              </div>
              <DashboardSuiteInfoChart />
            </div>
            <div className="mt-auto hidden w-fit md:block">
              <div className="flex items-center gap-4">
                <IconButton
                  icon="Plus"
                  text="Add Tenat"
                  href={{ query: { add_tenant: "true" } }}
                />

                <IconButton icon="Edit05" text="Edit Suite" href="#" />
              </div>
            </div>
          </div>
          <DueRequestSideBar length={3} />
        </section>
        <section className="mt-10 md:mt-6">
          <div className="flex items-center justify-between">
            <Title level={4} weight="bold" className="text-lg text-black">
              All Tenants
            </Title>

            <IconButton
              icon="Plus"
              text="Add Tenat"
              href={{ query: { add_tenant: "true" } }}
              className="w-fit gap-0.5 rounded-md px-2 py-2 text-xs md:hidden"
            />
          </div>

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
