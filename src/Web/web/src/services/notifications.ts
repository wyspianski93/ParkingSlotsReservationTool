import { fetchAuthorized } from "./fetchAuthorized";

export interface Notification {
  content: string;
}

export async function getNotifications(): Promise<{
  notifications: Notification[];
  error: string;
}> {
  const requestUrl = `http://localhost:5154/notifications`;

  let response: Response;

  try {
    response = await fetchAuthorized(requestUrl, {
      method: "get",
    });
  } catch (e) {
    return { notifications: [], error: "Could not connect to notifications service." };
  }

  if (response.status != 200) {
    return { notifications: [], error: "Error occured." };
  }

  const resultJson = await response.json();

  const notifications: Notification[] = resultJson as Notification[];

  return { notifications, error: "" };
}
