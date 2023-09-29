import { API } from "../base/axios";
import { encryptionHandler } from "../functions/encrypt";
import { LoginType, SessionResponse, SessionSchema } from "../schema/login";

interface SignUpType extends LoginType {
  role: "owner";
}

export interface SignUpResponse {
  role: string;
  email: string;
  accessToken: string;
}

class AuthService {
  private storeIndex = "d-suite-owner";

  private storeUser(user: SignUpResponse) {
    const res = encryptionHandler({
      action: "encrypt",
      data: JSON.stringify(user),
    });

    if (localStorage) {
      localStorage.setItem(this.storeIndex, res);
    }
  }

  async signup(data: SignUpType): Promise<SignUpResponse> {
    try {
      const res = await API.post("/auth/register", data);
      this.storeUser(res.data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async login(data: LoginType): Promise<SignUpResponse> {
    try {
      const res = await API.post("/auth/login", data);
      this.storeUser(res.data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  getSession(): SessionResponse | undefined {
    const user = localStorage.getItem(this.storeIndex);

    if (!user) {
      throw new Error("User is undefined");
    }

    try {
      const res = SessionSchema.parse(JSON.parse(user));
      return res;
    } catch (error) {
      throw error;
    }
  }
}
const authService = new AuthService();

export default authService;
