import { HomeInfoCard } from "@/components/atoms/HomeSharedUI";
import { FaviconLoader } from "@/components/atoms/Loader";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import DueRequestSideBar from "@/components/molecules/DueRequestSideBar";
import TenantDetailCard from "@/components/molecules/TenantDetailCard";
import AddTenantModal from "@/components/organisms/AddTenantModal";
import { DashboardSuiteInfoChart } from "@/components/organisms/DashboardCharts";
import { assertQuery, cn, localLog } from "@/utils";
import { useGetAllTenants } from "@/utils/hooks/api/tenant";
import { Button, IconBox, Title } from "@the_human_cipher/components-library";
import Link from "next/link";
import { useRouter } from "next/router";
import type { UrlObject } from "url";
import Placeholder from "@/assets/svg/invite-00.svg";
import Image from "next/image";

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

  const { data: allTenants, isLoading, isError, error } = useGetAllTenants();

  const { add_tenant } = router.query;

  localLog(allTenants);

  const handleClose = () => router.push({ query: {} });

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

  if (!allTenants) {
    return (
      <DashboardLayout headerDesc="Track maintenance on your dashboard ">
        <div>Unable to get all tenants at the moment</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {allTenants.length > 0 ? (
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
              {allTenants.map((ele, idx) => (
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
      ) : (
        <section className="grid h-[70vh] place-content-center">
          <Image src={Placeholder} alt="" className="w-[400px]" />
          <div className="mt-7 max-w-sm space-y-2 text-center">
            <h4 className="text-xl font-bold ">Get Started with Tenant Management</h4>
            <p className="text-sm">
              Add tenants to begin organizing your properties. Click Add Tenant to start
              building your tenant list.
            </p>
            <div className="mx-auto max-w-[150px] pt-4 text-sm">
              <IconButton
                icon="Plus"
                text="Add Tenat"
                href={{ query: { add_tenant: "true" } }}
                className="flex h-12 items-center justify-center rounded"
              />
            </div>
          </div>
        </section>
      )}

      {assertQuery(add_tenant) && (
        <AddTenantModal open onOpenChange={handleClose} onTenantAdded={handleClose} />
      )}
    </DashboardLayout>
  );
};

export default TenantPage;
