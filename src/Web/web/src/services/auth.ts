import { setRecoil } from "recoil-nexus";
import { userAuthorizationState } from "../state/userAuthorizationState";

interface Token {
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  public isAuthorized: boolean = false;
  private accessToken: string | undefined;
  private refreshToken: string | undefined;

  public setTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  public getAccessToken() {
    return this.accessToken;
  }

  public async authorize(email: string, password: string): Promise<{ error: string | undefined }> {
    const error = await this.authorizeInternal(
      "signin",
      JSON.stringify({ email, password }),
      this.setTokenAutoRefresh,
    );
    return error;
  }

  setTokenAutoRefresh() {
    const refresh = async () =>
      this.authorizeInternal(
        "refresh-token",
        JSON.stringify({ accessToken: this.accessToken, refreshToken: this.refreshToken }),
      );

    setInterval(refresh, 10800000);
  }

  async authorizeInternal(
    path: string,
    body: string,
    isAuthorizedCallback?: () => void,
  ): Promise<{ error: string | undefined }> {
    const requestUrl = `http://localhost:7132/${path}`;

    let response: Response;

    try {
      response = await fetch(requestUrl, {
        method: "post",
        headers: { "content-type": "application/json" },
        body,
      });
    } catch (e) {
      setRecoil(userAuthorizationState, { isAuthorized: false, roles: [] });
      return { error: "Could not connect to signin service." };
    }

    if (response.status != 200) {
      setRecoil(userAuthorizationState, { isAuthorized: false, roles: [] });
      return { error: "Could not authorize." };
    }

    const token: Token = await response.json();

    setRecoil(userAuthorizationState, { isAuthorized: true, roles: [] });

    this.accessToken = token.accessToken;
    this.refreshToken = token.refreshToken;

    isAuthorizedCallback && isAuthorizedCallback();

    return { error: undefined };
  }
}

export const authService = new AuthService();
