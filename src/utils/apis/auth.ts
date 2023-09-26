import { API } from "../base/axios";
import { LoginType } from "../schema/login";
interface SignUpType extends LoginType {
  role: "owner";
}

/**
 * for now response is the same
 */
export interface SignUpResponse {
  role: string;
  email: string;
  accessToken: string;
}

class AuthService {
  /**
   *Sign up user
   * @returns
   */
  async signup(data: SignUpType): Promise<SignUpResponse> {
    try {
      const res = await API.post("/auth/register", data);

      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async login(data: LoginType): Promise<SignUpResponse> {
    try {
      const res = await API.post("/auth/login", data);

      return res.data;
    } catch (error) {
      throw error;
    }
  }
}
const authService = new AuthService();
export default authService;
