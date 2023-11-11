import { API } from "../base/axios";
import { InferSchema } from "../schema/helpers";
import { AttachTenantSchema } from "../schema/tenant";
import { BaseAPIService } from "./base";

type AddTenantPayload = InferSchema<typeof AttachTenantSchema>;

class TenantService extends BaseAPIService {
  async addTenant({ email, suite_id }: AddTenantPayload) {
    try {
      const payload = {
        email,
        suite_id: Number(suite_id.value),
      };

      const res = await API.post("/user/attach-tenant", payload);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async inviteTenant({ email }: { email: string }) {
    try {
      const res = await API.post("/auth/register-tenant", { email });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getAllTenants() {
    type RESPONSE = APIResponse<DbGetAllTenants[]>;

    try {
      const res = await API.get<RESPONSE>("/user/tenants");
      return res.data.data;
    } catch (error) {
      throw error;
    }
  }
}

const tenantAPI = new TenantService();

export default tenantAPI;
