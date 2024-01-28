import { BaseAPIService } from "./base";
import { objectToFormData, parseDbSelectRecords } from "..";
import { API } from "../base/axios";
import {
  SpaceInfoSchema,
  SuiteInfoSchema,
  AccountInoSchema,
  UpdateSpaceInfoSchema,
} from "../schema/details";
import { InferSchema } from "../schema/helpers";

type SUITES = InferSchema<typeof SuiteInfoSchema>["suites"];
interface CreateSuitePayload {
  suites: SUITES;
  spaceId: string;
}

interface AddAccountPayload {
  accountDetails: InferSchema<typeof AccountInoSchema>;
  spaceId: string;
}

interface UpdateAccountPayload {
  accountDetails: InferSchema<typeof AccountInoSchema>;
}

interface UpdateSuitePayload {
  suiteId: SN;
  data: SUITES[number];
}

class Details extends BaseAPIService {
  async updatePersonalInfo(personId: string | number, payload: PersonalInfoPayload) {
    type ResponseBody = APIResponse<DbUpdatePersonalInfo>;

    const data = objectToFormData({ ...payload });

    try {
      const res = await API.patch<ResponseBody>(`/user`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.data;
    } catch (error) {
      throw error;
    }
  }

  async editPersonalInfo(payload: PersonalInfoPayload) {
    type ResponseBody = APIResponse<DbUserProfileResponse>;
    const { avatar, ...rest } = payload;
    const hasAvatar = avatar && typeof avatar !== "string";

    const cleanData = hasAvatar ? payload : rest;

    const data = objectToFormData({ ...payload });

    try {
      const res = await API.patch<ResponseBody>("/user", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const {
        data: { first_name, last_name, ...rest },
      } = res.data;

      this.updateUserSession({
        ...rest,
        name: `${first_name} ${last_name}`,
        role: "owner",
      });
      return res.data.data;
    } catch (error) {
      throw error;
    }
  }

  async createSpace(payload: InferSchema<typeof SpaceInfoSchema>) {
    type ResponseBody = APIResponse<DbCreateSpace>;

    const { space_amenities, ...rest } = payload;

    try {
      const res = await API.post<ResponseBody>("/space", {
        ...rest,
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

    const data = suites.map(
      ({ suite_cost, suite_size_length, suite_size_breadth, ...rest }) => ({
        ...rest,
        suite_cost: Number(suite_cost),
        suite_size: `${suite_size_length} by ${suite_size_breadth} ft`,
      })
    );

    try {
      const res = await API.post<ResponseBody>(`/space/${spaceId}/create-suit`, {
        suites: data,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async updateSuite({ suiteId, data }: UpdateSuitePayload) {
    type RES = APIResponse<unknown>;

    const { suite_cost, suite_size_breadth, suite_size_length, ...rest } = data;

    const payload = {
      ...rest,
      suite_cost: Number(suite_cost),
      suite_size: `${suite_size_length} by ${suite_size_breadth} ft`,
    };

    const res = await API.post<RES>(`/space/update/suite/${suiteId}`, payload);
    return res.data.data;
  }

  async addAccountDetails(data: AddAccountPayload) {
    const { accountDetails, spaceId } = data;
    type ResponseBody = APIResponse<DbCreateSpace>;
    try {
      const res = await API.patch<ResponseBody>(`/space`, accountDetails);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async updateAccountDetails(data: UpdateAccountPayload) {
    const { accountDetails } = data;
    type ResponseBody = APIResponse<DbUserProfileResponse>;
    try {
      const res = await API.patch<ResponseBody>(`/space`, accountDetails);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async updateSpace(payload: InferSchema<typeof UpdateSpaceInfoSchema>) {
    type ResponseBody = APIResponse<DbCreateSpace>;

    const { space_amenities, ...rest } = payload;

    const data: Record<string, unknown> = {
      ...rest,
      space_amenities: JSON.stringify(space_amenities),
    };

    try {
      const res = await API.patch<ResponseBody>("/space", data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async completeUserOnboarding(personId: string) {
    type ResponseBody = APIResponse<DbUpdatePersonalInfo>;

    const data = objectToFormData({ onboarded: true });

    try {
      const res = await API.patch<ResponseBody>(`/user`, data);

      const {
        data: { first_name, last_name, ...rest },
      } = res.data;

      this.updateUserSession({
        ...rest,
        name: `${first_name} ${last_name}`,
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
