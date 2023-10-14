import { objectToFormData } from "..";
import { API } from "../base/axios";
import { SpaceInfoSchema } from "../schema/details";
import { InferSchema } from "../schema/helpers";

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

    const spaceAmenities = space_amenities.map((ele) => ele.value);

    try {
      const res = await API.post<ResponseBody>("/space", {
        ...rest,
        space_size: Number(space_size),
        space_amenities: JSON.stringify(spaceAmenities),
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async createSuite(payload: unknown) {
    type ResponseBody = APIResponse<unknown>;

    try {
      const res = await API.post<ResponseBody>("/", payload);
    } catch (error) {}
  }
}

const onBoardingService = new Details();

export default onBoardingService;
