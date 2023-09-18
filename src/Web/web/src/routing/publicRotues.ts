import { Register } from "../pages/Register";
import { SignIn } from "../pages/SignIn";
import { Route } from "./route";

export enum PublicRoutes {
  SignIn = "/signin",
  Register = "/register",
}

export const publicRoutes: Route[] = [
  {
    path: PublicRoutes.SignIn,
    content: SignIn,
  },
  {
    path: PublicRoutes.Register,
    content: Register,
  },
];
