import { Notifications } from "@material-ui/icons";
import { Badge, styled } from "@mui/material";
import { useRecoilRefresher_UNSTABLE, useRecoilValueLoadable } from "recoil";
import { notificationsSelector } from "../../state/notificationsState";
import useNotificationsHub from "./useNotificationsHub";

export function NotificationsMenuItem(): JSX.Element {
  const notifications = useRecoilValueLoadable(notificationsSelector);
  const refreshNotification = useRecoilRefresher_UNSTABLE(notificationsSelector);

  useNotificationsHub({ onNotificationCreated: refreshNotification });

  let badgeContent;
  switch (notifications.state) {
    case "hasValue":
      badgeContent = notifications.contents.length;
      break;
    case "loading":
      badgeContent = 0;
      break;
    case "hasError":
      badgeContent = 0;
      break;
  }

  return (
    <StyledNotificationMenuItem>
      <Badge badgeContent={badgeContent} color={"error"} variant={"standard"}>
        <Notifications />
      </Badge>
      <span>Notifications</span>
    </StyledNotificationMenuItem>
  );
}

export const StyledNotificationMenuItem = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginLeft: "15px",
});
