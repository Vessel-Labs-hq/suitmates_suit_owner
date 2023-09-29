import { objectToFormData } from "..";
import { API } from "../base/axios";

class Details {
  async personalInfo(personId: string, payload: PersonalInfoPayload) {
    const data = objectToFormData(payload);

    try {
      const res = await API.post(`/user/${personId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (error) {}
  }
}

const onBoardingService = new Details();

export default onBoardingService;
