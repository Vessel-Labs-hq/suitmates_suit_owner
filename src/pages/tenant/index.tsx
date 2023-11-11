import { FaviconLoader } from "@/components/atoms/Loader";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import AddTenantModal from "@/components/organisms/AddTenantModal";
import { assertQuery, localLog } from "@/utils";
import { useGetAllTenants } from "@/utils/hooks/api/tenant";
import { Title } from "@the_human_cipher/components-library";
import { useRouter } from "next/router";
import { useGetProfile } from "@/utils/hooks/api/useGetProfile";
import { useMemo } from "react";
import {
  IconButton,
  TenantPageHeader,
  TenantPageTab,
} from "@/components/organisms/TenantPageBlocks";
import EmptyScreen from "@/components/molecules/EmptyScreen";

const TenantPage = () => {
  const router = useRouter();

  const { data: allTenants, isLoading, isError, error } = useGetAllTenants();
  const { data: profile } = useGetProfile();

  const { add_tenant } = router.query;

  localLog(allTenants);

  const inActiveTenants = useMemo(
    () => (allTenants ?? []).filter(({ onboarded }) => !onboarded),
    [allTenants]
  );

  const activeTenants = useMemo(
    () => (allTenants ?? []).filter(({ onboarded }) => onboarded),
    [allTenants]
  );

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
      <main>
        <TenantPageHeader
          vacantSuites={profile?.space.suite?.length ?? 0}
          occupiedSuites={profile?.space.suite?.length ?? 0}
        />
        <section className="mt-10 md:mt-6">
          <div className="flex items-center justify-between">
            <Title level={4} weight="bold" className="text-lg text-black">
              All Tenants
            </Title>

            <IconButton
              icon="Plus"
              text="Add Tenat"
              href={{ query: { add_tenant: "true" } }}
              className="h-10 w-fit gap-0.5 rounded-md px-2 py-2 text-xs md:hidden"
            />
          </div>
          {allTenants.length > 0 ? (
            <TenantPageTab
              activeTenants={activeTenants}
              inActiveTenants={inActiveTenants}
            />
          ) : (
            <EmptyScreen
              desc="You have not onboarded any tenants yet. "
              title="No Tenants Onboarded"
              className="mt-5 min-h-[40vh]"
            />
          )}
        </section>
      </main>

      {assertQuery(add_tenant) && (
        <AddTenantModal open onOpenChange={handleClose} onTenantAdded={handleClose} />
      )}
    </DashboardLayout>
  );
};

export default TenantPage;
