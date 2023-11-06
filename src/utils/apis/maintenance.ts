import { extend } from "dayjs";
import { API } from "../base/axios";
import { BaseAPIService } from "./base";
import { InferSchema } from "../schema/helpers";
import { UpdateMaintenanceRequestSchema } from "../schema/maintenance";

interface UpdateMaintenancePayload {
  requestId: SN;
  data: InferSchema<typeof UpdateMaintenanceRequestSchema>;
}

class MaintenanceService extends BaseAPIService {
  async getAllMaintenanceRequest() {
    try {
      type ResponseBody = APIResponse<DbGetAllMaintenanceRequest>;
      const res = await API.get<ResponseBody>("/maintenance/owner");
      return res.data.data;
    } catch (error) {
      throw error;
    }
  }

  async updateMaintenanceRequest({ requestId, data }: UpdateMaintenancePayload) {
    try {
      const { status, repair_time, repair_date } = data;

      const res = await API.patch(`/maintenance/${requestId}`, {
        repair_time: JSON.stringify(repair_time),
        status: status.value,
        repair_date,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

const maintenanceApi = new MaintenanceService();

export default maintenanceApi;
