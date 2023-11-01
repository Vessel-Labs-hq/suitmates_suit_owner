import { BaseAPIService } from "@/utils/apis/base";
import { API } from "@/utils/base/axios";

class UserProfile extends BaseAPIService {
  async getUserProfile(personId: number) {
    type ResponseBody = APIResponse<DbUserProfileResponse>;
    try {
      const res = await API.get<ResponseBody>(`/user/${personId}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

const profileManagement = new UserProfile();

export default profileManagement;
