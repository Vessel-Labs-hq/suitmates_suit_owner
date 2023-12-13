import DashboardLayout from "@/components/layouts/DashboardLayout";
import { IconBox } from "@the_human_cipher/components-library";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGetAllTenants } from "@/utils/hooks/api/tenant";

import { useMemo } from "react";
import { FaviconLoader } from "@/components/atoms/Loader";
import Icons from "@/assets/icons";

const TenantSinglePage = () => {
  const router = useRouter();

  const { tenant_id } = router.query;

  const { data, isLoading, isError } = useGetAllTenants();

  const selectedTenant = useMemo(
    () => (data ?? []).find(({ id }) => String(id) === tenant_id),
    [data, tenant_id]
  );

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

  if (!selectedTenant) {
    return (
      <DashboardLayout>
        <div className="mt-10">Oops something went wrong</div>
      </DashboardLayout>
    );
  }

  const websiteUrl = new URL(selectedTenant.businesses[0].website);
  const websiteWithoutProtocol = websiteUrl.hostname;

  const openHours = JSON.parse(selectedTenant.businesses[0].hours_of_business_open);
  const closeHours = JSON.parse(selectedTenant.businesses[0].hours_of_business_close);

  const tenantOccupation = JSON.parse(selectedTenant.businesses[0].occupation);

  const { avatar, first_name, last_name, email, phone_number, bio } = selectedTenant;
  const { business_name, days_of_business } = selectedTenant.businesses[0];

  return (
    <DashboardLayout>
      <p>tenant/:id</p>
    </DashboardLayout>
  );
};

export default TenantSinglePage;
