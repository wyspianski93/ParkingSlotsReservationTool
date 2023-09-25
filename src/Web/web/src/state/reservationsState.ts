import { selectorFamily } from "recoil";
import { getReservations } from "../services/reservations";

export const reservationsByUserSelector = selectorFamily({
  key: "reservationsByUserSelector",
  get:
    (reservedById: string) =>
    async ({ get }) => {
      const response = await getReservations({ type: "reservedById", value: reservedById });
      return response.reservations;
    },
});

export const reservationsBySlotSelector = selectorFamily({
  key: "reservationsBySlotSelector",
  get:
    (slotId: string) =>
    async ({ get }) => {
      const response = await getReservations({ type: "slotId", value: slotId });
      return response.reservations;
    },
});

export const reservationByIdAndUserSelector = selectorFamily({
  key: "reservationByIdAndUserSelector",
  get:
    ({ userId, reservationId }: { userId: string; reservationId: string }) =>
    ({ get }) => {
      const reservations = get(reservationsByUserSelector(userId));
      const reservation = reservations.find((x) => x.id == reservationId);
      return reservation;
    },
});
