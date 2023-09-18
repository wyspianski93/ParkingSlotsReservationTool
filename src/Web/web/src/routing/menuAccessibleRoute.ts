import { SvgIconComponent } from "@material-ui/icons";
import { Route } from "./route";

export interface MenuAccessibleRoute extends Route {
  icon: SvgIconComponent;
  name: string;
}
