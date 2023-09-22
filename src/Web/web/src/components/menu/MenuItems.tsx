import { useRecoilValue } from "recoil";

import { isMenuAccessibleRoute } from "../../routing/menuAccessibleRoute";
import { authorizedRoutes } from "../../routing/routes";
import { userAuthorizationState } from "../../state/userAuthorizationState";
import { MenuItem } from "./MenuItem";

export function MenuItems(): JSX.Element {
  const { isAuthorized } = useRecoilValue(userAuthorizationState);

  return (
    <div style={{ display: "flex", flexDirection: "row", padding: "5px" }}>
      {isAuthorized &&
        authorizedRoutes
          .filter(isMenuAccessibleRoute)
          .map((authorizedRoute) => (
            <MenuItem
              navigationPath={authorizedRoute.path}
              Icon={authorizedRoute.icon}
              name={authorizedRoute.name}
            ></MenuItem>
          ))}
    </div>
  );
}
