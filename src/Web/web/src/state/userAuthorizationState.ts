import { atom } from "recoil";

export const userAuthorizationState = atom({
  key: "authorizationState",
  default: { isAuthorized: false, token: "" },
});
