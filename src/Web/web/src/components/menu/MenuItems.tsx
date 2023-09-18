import { useRecoilValue } from "recoil";
import { authorizedRoutes } from "../../routing/authorizedRoutes";
import { userAuthorizationState } from "../../state/userAuthorizationState";
import { MenuItem } from "./MenuItem";

export function MenuItems(): JSX.Element {
  const { isAuthorized } = useRecoilValue(userAuthorizationState);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {isAuthorized &&
        authorizedRoutes.map((authorizedRoute) => (
          <MenuItem
            navigationPath={authorizedRoute.path}
            Icon={authorizedRoute.icon}
            name={authorizedRoute.name}
          ></MenuItem>
        ))}
    </div>
  );
}
