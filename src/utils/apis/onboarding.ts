import { objectToFormData } from "..";
import { API } from "../base/axios";
import { SpaceInfoSchema, SuiteInfoSchema } from "../schema/details";
import { InferSchema } from "../schema/helpers";

interface CreateSuitePayload {
  suites: InferSchema<typeof SuiteInfoSchema>;
  spaceId: string;
}

class Details {
  async updatePersonalInfo(personId: string | number, payload: PersonalInfoPayload) {
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

  async createSpace(payload: InferSchema<typeof SpaceInfoSchema>) {
    type ResponseBody = APIResponse<DbCreateSpace>;

    const { space_amenities, space_size, ...rest } = payload;

    try {
      const res = await API.post<ResponseBody>("/space", {
        ...rest,
        space_size: Number(space_size),
        space_amenities: JSON.stringify(space_amenities),
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async createSuite(payload: CreateSuitePayload) {
    const { spaceId, ...data } = payload;
    type ResponseBody = APIResponse<DbCreateSuite[]>;

    try {
      const res = await API.post<ResponseBody>(`/space/${spaceId}/create-suit`, data);
      return res.data;
    } catch (error) {}
  }
}

const onBoardingService = new Details();

export default onBoardingService;
