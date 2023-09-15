import { Dashboard } from "../pages/Dashboard";
import { Home } from "../pages/Home";
import { Route } from "./route";

export const authorizedRoutes: Route[] = [
  {
    path: "*",
    content: Home,
  },
  {
    path: "/",
    content: Home,
  },
  {
    path: "/home",
    content: Home,
  },
  {
    path: "/dashboard",
    content: Dashboard,
  },
];
