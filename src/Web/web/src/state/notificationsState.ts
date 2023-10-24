import { selector } from "recoil";
import { getNotifications } from "../services/notifications";

export const notificationsSelector = selector({
  key: "notificationsSelector",
  get: async ({ get }) => {
    const response = await getNotifications();
    return response.notifications;
  },
});
