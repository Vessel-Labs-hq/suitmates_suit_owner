import type { NextRouter } from "next/router";
import { API } from "../base/axios";
import { LoginType, AuthResponse, AuthResponseSchema } from "../schema/login";
import { BaseAPIService } from "./base";

interface SignUpType extends LoginType {
  role: "owner";
}

interface RedirectLoginArgs {
  effect(): void;
  router: NextRouter;
}

class AuthService extends BaseAPIService {
  public getSession = this.handleUserSession;

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
        const currentLocation = window.location.href;
        const locationToRedirectTo = "/auth/signin";

        localStorage.removeItem(this.storeIndex);

        /**
         * don't run on sign-in page
         */
        if (currentLocation.includes(locationToRedirectTo)) {
          return window.location.replace(locationToRedirectTo);
        }

        const url = `${locationToRedirectTo}?callbackUrl=${encodeURIComponent(
          currentLocation
        )}`;

        return window.location.replace(url);
      }
    }
  }

  async getUserDetails() {
    const user = this.getSession();

    try {
      const res = await API.get<APIResponse<DbGetUserDetails>>(`/user/${user?.id}`);
      return res.data.data;
    } catch (error) {
      throw error;
    }
  }
}

/**
 * Do not pass any property directly, but rather use as a callback
 *
 */
const authService = new AuthService();

export default authService;
