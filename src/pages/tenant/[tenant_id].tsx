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
  console.log("tenant", selectedTenant);

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
      <section className="max-w-[1280px] space-y-8 pb-40">
        <div className="flex gap-4">
          <Link className="mt-8 flex gap-1 max-sm:text-sm" href="/tenant">
            <IconBox className="max-sm:hidden" icon="ArrowNarrowLeft" size={24} />
            <IconBox className="sm:hidden" icon="ArrowNarrowLeft" size={18} />
            <span>Tenant</span>
          </Link>
        </div>

        <div className="flex w-full flex-col justify-between rounded-xl bg-light-gray py-6 sl:px-1 md:px-8 lg:flex-row">
          <div className="flex xxs:gap-x-2 md:gap-x-8">
            <div>
              <label className="flex h-[120px] w-[120px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl">
                <img src={avatar} alt="Avatar" className="h-full w-full object-cover" />
              </label>
            </div>
            <div className="mt-8 flex flex-col">
              <span className="text-2xl font-semibold">{`${first_name} ${last_name}`}</span>
              <span className="hidden text-base font-normal sl:block xxs:block lg:block">
                {email}
              </span>
            </div>
          </div>

          <div className="flex justify-between md:pl-[158px] lg:w-1/2 lg:items-center lg:gap-x-4 lg:pl-0">
            <div className="hidden md:block">
              <div className="flex gap-x-2 md:flex-row lg:flex-row">
                <span className="text-2xl font-semibold">
                  {selectedTenant.suite?.suite_number
                    ? `Suite ${selectedTenant.suite.suite_number}`
                    : "Not Assigned"}
                </span>

                <span className="mt-2">{Icons.Ellipse}</span>

                <span className="mt-1 text-xs">
                  {selectedTenant.suite?.suite_type
                    ? JSON.parse(selectedTenant.suite.suite_type).label
                    : "Not Assigned"}
                </span>
              </div>
              <span className="text-base font-normal">{tenantOccupation.label}</span>
            </div>

            <div className="hidden flex-col md:flex">
              <span className="text-2xl font-semibold md:text-xl">{phone_number}</span>
              <span className="text-base font-normal">{`www.${websiteWithoutProtocol}`}</span>
            </div>
          </div>
        </div>

        <div className="max-w-[900px] space-y-8 pb-40">
          <div>
            <form action="">
              <div className="flex flex-col gap-y-2">
                <span className="text-base font-bold">Bio</span>
                <label className="border-none bg-white outline-none focus:outline-none">
                  {bio || ""}
                </label>
              </div>

              <div className="mt-10 flex flex-col gap-9 md:flex-row">
                <div className="flex flex-col gap-y-2">
                  <span className="text-base font-bold">Business Name</span>
                  <label className="w-58 flex h-12 items-center justify-center rounded-lg bg-light-gray px-4 text-center text-base font-normal">
                    {business_name || ""}
                  </label>
                </div>

                <div className="flex flex-col gap-y-2">
                  <span className="text-base font-bold">Working Days</span>
                  <label className="mr-4 flex h-12 items-center justify-center rounded-lg bg-light-gray px-4 text-center text-base font-normal">
                    {JSON.parse(days_of_business)
                      .map((day: { label: string; value: string }) => day.label)
                      .join(", ") || ""}
                  </label>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-y-2">
                <span className="text-base font-bold">Hours</span>
                <label className="flex h-12 w-48 items-center justify-center rounded-lg bg-light-gray px-4 text-center text-base font-normal">
                  {`${openHours.label} - ${closeHours.label}` || ""}
                </label>
              </div>

              <div className="mt-10 flex items-center gap-9 xsl:flex-col sl:flex-col md:flex-row">
                <div className="flex flex-col gap-y-2">
                  <span className="text-base font-bold">Documents</span>
                  <label className="flex h-12 w-48 items-center justify-center rounded-lg bg-light-gray px-4 text-center text-base font-normal">
                    <span>{Icons.FileAttachment}</span>
                    Certificate.pdf
                  </label>
                </div>

                <div className="mt-8">
                  <label className="flex h-12 w-48 items-center justify-center rounded-lg bg-light-gray px-4 text-center text-base font-normal">
                    <span>{Icons.FileAttachment}</span>
                    License.pdf
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default TenantSinglePage;
