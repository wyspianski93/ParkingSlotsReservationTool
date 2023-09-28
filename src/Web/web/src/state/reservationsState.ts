import { selector, selectorFamily } from "recoil";
import { getReservations } from "../services/reservations";
import { userAuthorizationState } from "./userAuthorizationState";

export const reservationsSelector = selector({
  key: "reservationsSelector",
  get: async ({ get }) => {
    const response = await getReservations();
    return response.reservations;
  },
});

export const reservationsByCurrentUserSelector = selector({
  key: "reservationsByCurrentUserSelector",
  get: async ({ get }) => {
    const { userId } = get(userAuthorizationState);
    const reservations = get(reservationsSelector).filter(
      (reservation) => reservation.reservedById === userId,
    );
    return reservations;
  },
});

export const reservationsBySlotSelector = selectorFamily({
  key: "reservationsBySlotSelector",
  get:
    (slotId: string) =>
    async ({ get }) => {
      const reservations = get(reservationsSelector).filter(
        (reservation) => reservation.slotId === slotId,
      );
      return reservations;
    },
});

export const reservationByIdAndCurrentUserSelector = selectorFamily({
  key: "reservationByIdAndCurrentUserSelector",
  get:
    (reservationId: string) =>
    ({ get }) => {
      const reservations = get(reservationsByCurrentUserSelector);
      const reservation = reservations.find((x) => x.id == reservationId);
      return reservation;
    },
});
