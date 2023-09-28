import jwtDecode from "jwt-decode";
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

  constructor() {
    this.setTokenAutoRefresh = this.setTokenAutoRefresh.bind(this);
  }

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

  public setTokenAutoRefresh() {
    const refresh = async () => {
      await this.authorizeInternal(
        "refresh-token",
        JSON.stringify({ accessToken: this.accessToken, refreshToken: this.refreshToken }),
      );
    };

    setInterval(refresh, 300000);
  }

  private getUserId(token: string | undefined) {
    if (token === undefined) {
      return "";
    }

    const decoded = jwtDecode<{ userName: string; userId: string }>(token);

    return decoded.userId ?? "";
  }

  private async authorizeInternal(
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
      setRecoil(userAuthorizationState, { isAuthorized: false, userId: "", roles: [] });
      return { error: "Could not connect to signin service." };
    }

    if (response.status != 200) {
      setRecoil(userAuthorizationState, { isAuthorized: false, userId: "", roles: [] });
      return { error: "Could not authorize." };
    }

    const token: Token = await response.json();

    setRecoil(userAuthorizationState, {
      isAuthorized: true,
      userId: this.getUserId(token.accessToken),
      roles: [],
    });

    this.setTokens(token.accessToken, token.refreshToken);

    isAuthorizedCallback && isAuthorizedCallback();

    return { error: undefined };
  }
}

export const authService = new AuthService();
