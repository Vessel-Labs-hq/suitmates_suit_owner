import { API } from "../base/axios";
import { InferSchema } from "../schema/helpers";
import { AddTenantByInviteSchema } from "../schema/tenant";
import { BaseAPIService } from "./base";

type AddTenantPayload = InferSchema<typeof AddTenantByInviteSchema>;

class TenantService extends BaseAPIService {
  async addTenant({ email, suite_id }: AddTenantPayload) {
    try {
      const payload = {
        email,
        suite_id: JSON.stringify(suite_id),
      };

      const res = await API.post("/tenant", payload);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

const tenantAPI = new TenantService();

export default tenantAPI;
