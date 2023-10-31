import { BaseAPIService } from "@/utils/apis/base";
import { API } from "@/utils/base/axios";
// import { SpaceInfoSchema } from "@/utils/schema/details";
// import { InferSchema } from "@/utils/schema/helpers";

class UserProfile extends BaseAPIService {
  async getUserProfile(personId: number) {
    type ResponseBody = APIResponse<DbUserProfileResponse>;
    try {
      const res = await API.get<ResponseBody>(`/user/${personId}`);
      //   res.data.map;
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  //   async updateUserSpace(payload: InferSchema<typeof SpaceInfoSchema>) {
  //     type ResponseBody = APIResponse<DbUserProfileResponse>;

  //     const { space_amenities, space_size, ...rest } = payload;

  //     try {
  //       const res = await API.post<ResponseBody>("/space", {
  //         ...rest,
  //         space_amenities: JSON.stringify(space_amenities),
  //       });
  //       return res.data;
  //     } catch (error) {
  //       throw error;
  //     }
  //   }
}

const profileManagement = new UserProfile();

export default profileManagement;
