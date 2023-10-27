import DashboardLayout from "@/components/layouts/DashboardLayout";
import AddTenantModal from "@/components/organisms/AddTenantModal";
import { assertQuery } from "@/utils";
import { Button } from "@the_human_cipher/components-library";
import { useRouter } from "next/router";

const TenantSinglePage = () => {
  const router = useRouter();

  const { add_tenant, tenant_id } = router.query;

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
        <AddTenantModal
          open
          onOpenChange={() =>
            router.push({
              query: { tenant_id },
            })
          }
        />
      )}
    </DashboardLayout>
  );
};

export default TenantSinglePage;
