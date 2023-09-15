import { Register } from "../pages/Register";
import { SignIn } from "../pages/SignIn";
import { Route } from "./route";

export const publicRoutes: Route[] = [
  {
    path: "/signin",
    content: SignIn,
  },
  {
    path: "/register",
    content: Register,
  },
];
