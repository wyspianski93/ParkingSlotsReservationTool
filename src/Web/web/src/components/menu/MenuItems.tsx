import { useRecoilValue } from "recoil";

import { isMenuAccessibleRoute } from "../../routing/menuAccessibleRoute";
import { authorizedRoutes } from "../../routing/routes";
import { userAuthorizationState } from "../../state/userAuthorizationState";
import { MenuNavigationItem } from "./MenuItem";
import { NotificationsMenuItem } from "./NotificationsMenuItem";

export function MenuItems(): JSX.Element {
  const { isAuthorized } = useRecoilValue(userAuthorizationState);

  return (
    <>
      {isAuthorized && (
        <div style={{ display: "flex", flexDirection: "row", padding: "5px" }}>
          {authorizedRoutes.filter(isMenuAccessibleRoute).map((authorizedRoute) => (
            <MenuNavigationItem
              key={`${authorizedRoute.name}_${authorizedRoute.path}`}
              navigationPath={authorizedRoute.path}
              Icon={authorizedRoute.icon}
              name={authorizedRoute.name}
            ></MenuNavigationItem>
          ))}
          <NotificationsMenuItem />
        </div>
      )}
    </>
  );
}
