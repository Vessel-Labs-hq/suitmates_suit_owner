import { encryptionHandler } from "../functions/encrypt";
import { AuthResponse, AuthResponseSchema } from "../schema/login";

export class BaseAPIService {
  protected storeIndex = "d-suite-tenant";

  protected storeUser(user: AuthResponse) {
    const res = encryptionHandler({
      action: "encrypt",
      data: JSON.stringify(user),
    });

    if (typeof localStorage !== "undefined") {
      localStorage.setItem(this.storeIndex, res);
    }
  }

  /** hidden to other class members, can not be used by instances */
  protected handleUserSession(): AuthResponse | undefined {
    if (typeof localStorage !== "undefined") {
      const user = localStorage.getItem(this.storeIndex);

      if (user) {
        const data = encryptionHandler({ action: "decrypt", data: user });

        const res = AuthResponseSchema.safeParse(JSON.parse(data));

        if (res.success) {
          // window.dispatchEvent(new Event("UpdatedUserData"));
          return res.data;
        }
      }

      return undefined;
    }
  }

  protected updateUserSession(data: Partial<AuthResponse>) {
    const user = this.handleUserSession();

    if (user) {
      this.storeUser({ ...user, ...data });
    }
    window.dispatchEvent(new Event("UpdatedUserData"));
  }
}
