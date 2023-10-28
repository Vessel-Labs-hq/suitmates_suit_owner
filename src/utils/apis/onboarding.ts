import { BaseAPIService } from "./base";
import { objectToFormData, parseDbSelectRecords } from "..";
import { API } from "../base/axios";
import { SpaceInfoSchema, SuiteInfoSchema, AccountInoSchema } from "../schema/details";
import { InferSchema } from "../schema/helpers";

interface CreateSuitePayload {
  suites: InferSchema<typeof SuiteInfoSchema>["suites"];
  spaceId: string;
}

interface AddAccountPayload {
  accountDetails: InferSchema<typeof AccountInoSchema>;
  spaceId: string;
}

class Details extends BaseAPIService {
  async updatePersonalInfo(personId: string | number, payload: PersonalInfoPayload) {
    type ResponseBody = APIResponse<DbUpdatePersonalInfo>;

    const data = objectToFormData({ ...payload });

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
    const { spaceId, suites } = payload;
    type ResponseBody = APIResponse<DbCreateSuite[]>;

    const data = suites.map(({ suite_cost, suite_type, timing, ...rest }) => ({
      ...rest,
      suite_cost: Number(suite_cost),
      suite_type: JSON.stringify(suite_type),
      timing: JSON.stringify(timing),
    }));

    try {
      const res = await API.post<ResponseBody>(`/space/${spaceId}/create-suit`, {
        suites: data,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async addAccountDetails(data: AddAccountPayload) {
    const { accountDetails, spaceId } = data;
    type ResponseBody = APIResponse<DbCreateSpace>;
    try {
      const res = await API.patch<ResponseBody>(`/space/${spaceId}`, accountDetails);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async completeUserOnboarding(personId: string) {
    type ResponseBody = APIResponse<DbUpdatePersonalInfo>;

    const data = objectToFormData({ onboarded: true });

    try {
      const res = await API.patch<ResponseBody>(`/user/${personId}`, data);

      this.updateUserSession({
        ...res.data.data,
        role: "owner",
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getUserSpace(spaceId: SN) {
    try {
      const res = await API.get<APIResponse<DbSpace>>(`/space/${spaceId}`);

      const { space_amenities, ...rest } = res.data.data;

      const data = {
        ...rest,
        space_amenities: parseDbSelectRecords(space_amenities),
      };

      return data;
    } catch (error) {
      throw error;
    }
  }
}

const onBoardingService = new Details();

export default onBoardingService;
