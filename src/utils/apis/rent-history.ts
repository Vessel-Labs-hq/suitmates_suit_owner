import { BaseAPIService } from "./base";
import { API } from "../base/axios";

class RentHistoryService extends BaseAPIService {
  async getAllRentHistory() {
    try {
      type ResponseBody = APIResponse<DbPaymentHistory[]>;
      const res = await API.get<ResponseBody>("/space/owner/rent-history");
      return res.data.data as DbPaymentHistory[];
    } catch (error) {
      throw error;
    }
  }

  async getRentChartHistory() {
    try {
      type ResponseBody = APIResponse<DbRentChartHistory>;
      const res = await API.get<ResponseBody>("/space/owner/rent-history/chart");
      return res.data.data;
    } catch (error) {
      throw error;
    }
  }

  async getManualRentUpload() {
    type Response = APIResponse<DbGetManualPayments>;
    const res = await API.get<Response>("/user/manual/payments");
    return res.data.data;
  }

  async approveOrDeclineManualPayment(id: SN, status: DbGetManualTarget) {
    const res = await API.post(`/user/manual/payment/update/${id}/${status}`);
    return res.data;
  }
}

const rentHistoryApi = new RentHistoryService();

export default rentHistoryApi;
