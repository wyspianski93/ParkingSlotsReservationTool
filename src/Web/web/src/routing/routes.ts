import { LocalParking, Mail, Search } from "@material-ui/icons";
import { Slot } from "../pages/Slot";
import { Slots } from "../pages/Slots";
import { UserReservations } from "../pages/UserReservations";
import { UserSlot } from "../pages/UserSlot";
import { UserSlots } from "../pages/UserSlots";
import { AuthorizedRoute } from "./authorizedRoute";
import { MenuAccessibleRoute } from "./menuAccessibleRoute";

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
  new AuthorizedRoute({
    path: "/user-slots/:slotId",
    content: UserSlot,
  }),
];
