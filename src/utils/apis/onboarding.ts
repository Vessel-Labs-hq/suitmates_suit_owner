import { objectToFormData } from "..";
import { API } from "../base/axios";

class Details {
  async updatePersonalInfo(
    personId: string | number,
    payload: PersonalInfoPayload
  ) {
    type ResponseBody = APIResponse<DbUpdatePersonalInfo>;

    const data = objectToFormData(payload);

    try {
      const res = await API.patch<ResponseBody>(`/user/${personId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

const onBoardingService = new Details();

export default onBoardingService;
