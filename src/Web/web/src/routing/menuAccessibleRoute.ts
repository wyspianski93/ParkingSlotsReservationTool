import { SvgIconComponent } from "@material-ui/icons";
import { throwError } from "../utils/throwError";
import { AuthorizedRoute } from "./authorizedRoute";

export class MenuAccessibleRoute extends AuthorizedRoute {
  public icon: SvgIconComponent;
  public name: string;

  public constructor({
    icon,
    name,
    path,
    content,
  }: {
    path: string;
    content: () => JSX.Element;
    icon: SvgIconComponent;
    name: string;
  }) {
    super({ path, content });

    this.icon = icon ?? throwError("Icon cannot be null.");
    this.name = name ?? throwError("Name cannot be null.");
  }
}

export function isMenuAccessibleRoute(route: AuthorizedRoute): route is MenuAccessibleRoute {
  return (route as MenuAccessibleRoute).icon != null && (route as MenuAccessibleRoute).name != null;
}
