import { encryptionHandler } from "../functions/encrypt";
import { AuthResponse, AuthResponseSchema } from "../schema/login";

export class BaseAPIService {
  protected storeIndex = "d-suite-owner";

  protected storeUser(user: AuthResponse) {
    const res = encryptionHandler({
      action: "encrypt",
      data: JSON.stringify(user),
    });

    if (typeof localStorage !== "undefined") {
      localStorage.setItem(this.storeIndex, res);
    }
  }

  protected handleUserSession(): AuthResponse | undefined {
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

  protected updateUserSession(data: Partial<AuthResponse>) {
    const user = this.handleUserSession();

    if (user) {
      this.storeUser({ ...user, ...data });
    }
  }
}
