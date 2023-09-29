import { API } from "../base/axios";
import { encryptionHandler } from "../functions/encrypt";
import { LoginType, AuthResponse, AuthResponseSchema } from "../schema/login";

interface SignUpType extends LoginType {
  role: "owner";
}

class AuthService {
  private storeIndex = "d-suite-owner";

  private storeUser(user: AuthResponse) {
    const res = encryptionHandler({
      action: "encrypt",
      data: JSON.stringify(user),
    });

    if (localStorage) {
      localStorage.setItem(this.storeIndex, res);
    }
  }

  async signup(data: SignUpType): Promise<AuthResponse> {
    try {
      const res = await API.post("/auth/register", data);
      this.storeUser(res.data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async login(data: LoginType): Promise<AuthResponse> {
    try {
      const res = await API.post("/auth/login", data);
      this.storeUser(res.data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  getSession(muteError?: boolean): AuthResponse | undefined {
    if (localStorage) {
      const user = localStorage.getItem(this.storeIndex);

      if (!user) {
        /** if you want to access the user without throwing an error  */
        if (muteError) return;

        throw new Error("User is undefined");
      }

      const data = encryptionHandler({ action: "decrypt", data: user });

      const res = AuthResponseSchema.safeParse(JSON.parse(data));

      if (res.success) {
        return res.data;
      }
    }
  }

  logOut(): void {
    if (localStorage) {
      localStorage.removeItem(this.storeIndex);
    }
  }
}
const authService = new AuthService();

export default authService;
