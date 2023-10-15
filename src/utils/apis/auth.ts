import type { NextRouter } from "next/router";
import { API } from "../base/axios";
import { encryptionHandler } from "../functions/encrypt";
import { LoginType, AuthResponse, AuthResponseSchema } from "../schema/login";

interface SignUpType extends LoginType {
  role: "owner";
}

interface RedirectLoginArgs {
  effect(): void;
  router: NextRouter;
}

class AuthService {
  private storeIndex = "d-suite-owner";

  private storeUser(user: AuthResponse) {
    const res = encryptionHandler({
      action: "encrypt",
      data: JSON.stringify(user),
    });

    if (typeof localStorage !== "undefined") {
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

  getSession(): AuthResponse | undefined {
    if (typeof localStorage !== "undefined") {
      const user = localStorage.getItem(this.storeIndex);

      if (!user) return;

      const data = encryptionHandler({ action: "decrypt", data: user });

      const res = AuthResponseSchema.safeParse(JSON.parse(data));

      if (res.success) {
        return res.data;
      }
    }
  }

  async validateSession() {
    const data = this.getSession();

    try {
      const res = await API.post("auth/verify-token", { token: data?.accessToken });

      return res.data;
    } catch (error) {
      throw error;
    }
  }

  /** pass router for clean redirect(as an SPA), it wont clear cached data */
  redirectLogin(args?: Partial<RedirectLoginArgs>) {
    if (typeof window !== "undefined") {
      const currentLocation = encodeURIComponent(window.location.href);

      if (args?.effect) {
        args.effect();
      }

      const url = `/auth/signin?callbackUrl=${currentLocation}`;

      if (typeof localStorage !== "undefined") {
        localStorage.removeItem(this.storeIndex);
      }

      return args?.router ? args.router.push(url) : window.location.replace(url);
    }
  }

  /**
   * logout is an explicit method, it clears the cache
   * @example```tsx
   *  <button onClick={()=> authService.logOut()}>Logout</button>
   * ```
   */
  logOut(): void {
    if (typeof localStorage !== "undefined") {
      if (typeof window !== "undefined") {
        const currentLocation = encodeURIComponent(window.location.href);
        const url = `/auth/signin?callbackUrl=${currentLocation}`;

        localStorage.removeItem(this.storeIndex);

        window.location.replace(url);
      }
    }
  }
}

/**
 * Do not pass any property directly, but rather use as a callback
 *
 */
const authService = new AuthService();

export default authService;
