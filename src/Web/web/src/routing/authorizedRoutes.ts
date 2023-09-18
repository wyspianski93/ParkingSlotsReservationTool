import { LocalParking, Mail, Search, SvgIconComponent } from "@material-ui/icons";
import { AuthorizedPageContent } from "../pages/AuthorizedPageContent";
import { SlotSearch } from "../pages/SlotSearch";
import { UserReservations } from "../pages/UserReservations";
import { UserSlots } from "../pages/UserSlots";
import { throwError } from "../utils/throwError";
import { MenuAccessibleRoute } from "./menuAccessibleRoute";

export class AuthorizedRoute implements MenuAccessibleRoute {
  public path: string;
  public name: string;
  public icon: SvgIconComponent;
  public content: () => JSX.Element;

  public constructor(init?: Partial<AuthorizedRoute>) {
    this.path = init?.path ?? throwError("Path cannot be null.");
    this.name = init?.name ?? throwError("Name cannot be null.");
    this.icon = init?.icon ?? throwError("Icon cannot be null.");

    if (init?.content === undefined) {
      throw new Error("Content must be specified.");
    }

    this.content = () => AuthorizedPageContent({ children: init!.content!() });
  }
}

export const authorizedRoutes: AuthorizedRoute[] = [
  new AuthorizedRoute({
    path: "/search",
    content: SlotSearch,
    icon: Search,
    name: "Reserve a slot",
  }),
  new AuthorizedRoute({
    path: "/reservations",
    content: UserReservations,
    icon: Mail,
    name: "My reservations",
  }),
  new AuthorizedRoute({
    path: "/slots",
    content: UserSlots,
    icon: LocalParking,
    name: "My slots",
  }),
];
