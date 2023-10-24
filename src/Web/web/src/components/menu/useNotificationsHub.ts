import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { authService } from "../../services/auth";

export default function useNotificationsHub({
  onNotificationCreated,
}: {
  onNotificationCreated: () => void;
}) {
  const [connection, setConnection] = useState<null | HubConnection>(null);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5154/hubs/notifications", {
        accessTokenFactory: () => authService.getAccessToken()!,
      })
      .withAutomaticReconnect()
      .build();

    setConnection(connection);
  }, []);

  useEffect(() => {
    const startConnection = async () => {
      if (connection) {
        await connection.start();
      }
    };

    if (connection) {
      startConnection();
      connection.on("NotificationCreated", (message) => {
        console.log(message);
        onNotificationCreated();
      });
    }
  }, [connection]);
}
