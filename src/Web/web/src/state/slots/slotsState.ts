import { selector, selectorFamily } from "recoil";
import { getReservableSlots, getSlot, getSlots } from "../../services/slots";
import { userAuthorizationState } from "../userAuthorizationState";
import { slotsFilterState } from "./slotsFilterState";

export const slotsSelector = selector({
  key: "slotsSelector",
  get: async ({ get }) => {
    const response = await getSlots();
    return response.slots;
  },
});

// export const reservableSlots = selectorFamily({
//   key: "reservableSlots",
//   get:
//     ({ from, to }: { from: string; to: string }) =>
//     async ({ get }) => {
//       const response = await getReservableSlots(from, to);
//       return response.slots;
//     },
// });

export const slotByIdSelector = selectorFamily({
  key: "slotByIdSelector",
  get:
    (slotId: string) =>
    async ({ get }) => {
      const { slot } = await getSlot(slotId);
      return slot;
    },
});

export const slotsByCurrentUserSelector = selector({
  key: "slotsByCurrentUserSelector",
  get: ({ get }) => {
    const slots = get(slotsSelector);
    const { userId } = get(userAuthorizationState);
    const userSlots = slots.filter((x) => x.ownerId === userId);
    return userSlots;
  },
});

export const slotByIdAndCurrentUserSelector = selectorFamily({
  key: "slotByIdAndCurrentUserSelector",
  get:
    (slotId: string) =>
    ({ get }) => {
      const userSlots = get(slotsByCurrentUserSelector);
      const userSlot = userSlots.find((x) => x.id === slotId);
      return userSlot;
    },
});

export const reservableSlotsByNotCurrentUserSelector = selector({
  key: "reservableSlotsByNotCurrentUserSelector",
  get: async ({ get }) => {
    const { from, to } = get(slotsFilterState);
    const { userId } = get(userAuthorizationState);

    if (Date.parse(from) > Date.parse(to)) {
      return [];
    }

    const { slots } = await getReservableSlots(from, to);

    if (!slots) {
      return [];
    }

    return slots.filter((x) => x.ownerId !== userId);
  },
});
