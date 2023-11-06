import { API } from "../base/axios";
import { objectToFormData } from "../functions/objectToFormData";
import { InferSchema } from "../schema/helpers";
// import { CreateMaintenanceSchema, InferSchema } from "../schema";
import { BaseAPIService } from "./base";

class MaintenanceService extends BaseAPIService {
  async getAllMaintenanceRequest() {
    try {
      const res =
        await API.get<APIResponse<DbGetAllMaintenanceRequest>>("/maintenance/owner");
      return res.data.data;
    } catch (error) {
      throw error;
    }
  }
}

const maintenanceApi = new MaintenanceService();

export default maintenanceApi;
