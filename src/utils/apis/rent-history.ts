import { BaseAPIService } from "./base";
import { API } from "../base/axios";

class RentHistoryService extends BaseAPIService {
  async getAllRentHistory() {
    try {
      console.log("calling rent history");
      type ResponseBody = APIResponse<DbPaymentHistory[]>;
      const res = await API.get<ResponseBody>("/space/owner/rent-history");
      console.log("calling rent history", res);
      return res.data.data;
    } catch (error) {
      throw error;
    }
  }
}

const rentHistoryApi = new RentHistoryService();

export default rentHistoryApi;
