import { atom } from "recoil";

// const refreshTokenEffect: (key: string) => AtomEffect<{ isAuthorized: boolean; roles: string[] }> =
//   (key: string) =>
//   ({ setSelf, trigger }) => {
//     if (trigger == "get") {
//       const isAuthorized = authService.isAuthorized;
//       setSelf({ isAuthorized, roles: [] });
//     }
//   };

export const userAuthorizationState = atom({
  key: "authorizationState",
  default: { isAuthorized: false, userId: "", roles: [] as string[] },
  // effects: [refreshTokenEffect("userstate")],
});
