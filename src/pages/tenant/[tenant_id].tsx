import DashboardLayout from "@/components/layouts/DashboardLayout";
import { InviteTenantModal } from "@/components/organisms/AddTenantModal";
import { assertQuery } from "@/utils";
import { Button } from "@the_human_cipher/components-library";
import { useRouter } from "next/router";

const TenantSinglePage = () => {
  const router = useRouter();

  const { add_tenant, tenant_id } = router.query;

  const handleClose = () =>
    router.push({
      query: { tenant_id },
    });

  return (
    <DashboardLayout>
      <p>/tenant/:tenant_id</p>

      <div className="mt-10 w-fit">
        <Button
          className="px-3"
          onClick={() =>
            router.push({
              query: {
                ...router.query,
                add_tenant: true,
              },
            })
          }
        >
          Add Tenant
        </Button>
      </div>

      {assertQuery(add_tenant) && (
        <InviteTenantModal open onOpenChange={handleClose} onTenantAdded={handleClose} />
      )}
    </DashboardLayout>
  );
};

export default TenantSinglePage;
