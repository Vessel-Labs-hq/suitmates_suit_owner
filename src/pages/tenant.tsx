import DashboardLayout from "@/components/layouts/DashboardLayout";
import { API } from "@/utils/base/axios";
import { Input } from "@the_human_cipher/components-library";
import { FormEvent } from "react";

const TenantPage = () => {
  const addTenant = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fields = new FormData(e.currentTarget);

    try {
      const res = await API.post("/auth/register-tenant", fields);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <p>/tenant</p>

      <form onSubmit={addTenant}>
        <Input type="email" name="email" />
        <button>Submit</button>
      </form>
    </DashboardLayout>
  );
};

export default TenantPage;
