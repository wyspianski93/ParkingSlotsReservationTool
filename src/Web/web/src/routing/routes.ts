import { LocalParking, Mail, Search } from "@material-ui/icons";
import { Register } from "../pages/Register";
import { SignIn } from "../pages/SignIn";
import { Slot } from "../pages/Slot";
import { Slots } from "../pages/Slots";
import { UserReservations } from "../pages/UserReservations";
import { UserSlots } from "../pages/UserSlots";
import { AuthorizedRoute } from "./authorizedRoutes";
import { MenuAccessibleRoute } from "./menuAccessibleRoute";
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

export const authorizedRoutes: AuthorizedRoute[] = [
  new MenuAccessibleRoute({
    path: "/slots",
    content: Slots,
    icon: Search,
    name: "Reserve a slot",
  }),
  new AuthorizedRoute({
    path: "/slots/:slotId",
    content: Slot,
  }),
  new MenuAccessibleRoute({
    path: "/reservations",
    content: UserReservations,
    icon: Mail,
    name: "My reservations",
  }),
  new MenuAccessibleRoute({
    path: "/user-slots",
    content: UserSlots,
    icon: LocalParking,
    name: "My slots",
  }),
];
