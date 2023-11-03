import { Notifications } from "@material-ui/icons";
import { Badge, Box, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useRecoilRefresher_UNSTABLE, useRecoilValueLoadable } from "recoil";
import { Notification } from "../../services/notifications";
import { notificationsSelector } from "../../state/notificationsState";
import { useOnClickedOutsideRef } from "../../utils/useOnClickedOutsideRef";
import useNotificationsHub from "./useNotificationsHub";

export function NotificationsMenuItem(): JSX.Element {
  const notifications = useRecoilValueLoadable(notificationsSelector);
  const refreshNotifications = useRecoilRefresher_UNSTABLE(notificationsSelector);
  const [isNotificationsContainerVisible, setIsNotificationsContainerVisible] = useState(false);

  useNotificationsHub({ onNotificationCreated: refreshNotifications });

  useEffect(() => {
    const markNotificationsAsRead = async () => {
      // if (unreadNotifications.length > 0) {
      // await changeNotificationsStatus(notificationsIds, Status.Read)
      //}
      refreshNotifications();
    };
    if (isNotificationsContainerVisible) {
      markNotificationsAsRead();
    }
  }, [isNotificationsContainerVisible]);

  const ref = useRef(null);
  useOnClickedOutsideRef(ref, () => setIsNotificationsContainerVisible(false));

  let badgeContent;
  let notificationsContent: Notification[];
  switch (notifications.state) {
    case "hasValue":
      badgeContent = notifications.contents.length;
      notificationsContent = notifications.contents;
      break;
    case "loading":
      badgeContent = 0;
      notificationsContent = [];
      break;
    case "hasError":
      badgeContent = 0;
      notificationsContent = [];
      break;
  }

  return (
    <>
      <StyledNotificationMenuItem
        ref={ref}
        onClick={() => setIsNotificationsContainerVisible((isVisible) => !isVisible)}
      >
        <Badge badgeContent={badgeContent} color={"error"} variant={"standard"}>
          <Notifications />
        </Badge>
        <span>Notifications</span>
      </StyledNotificationMenuItem>
      {isNotificationsContainerVisible && (
        <Box
          ref={ref}
          sx={{
            backgroundColor: "#ffcfc1",
            border: "solid black 2px",
            position: "absolute",
            top: "60px",
            right: "145px",
            width: "200px",
            height: "300px",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            zIndex: 9999999,
          }}
        >
          {notificationsContent.map((notification) => (
            <div style={{ padding: "8px", width: "100%", borderBottom: "solid black 1px" }}>
              {notification.content}
            </div>
          ))}
        </Box>
      )}
    </>
  );
}

export const StyledNotificationMenuItem = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginLeft: "15px",
});
