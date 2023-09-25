import { selector, selectorFamily } from "recoil";
import { getSlots } from "../services/slots";

export const slotsSelector = selector({
  key: "slotsSelector",
  get: async ({ get }) => {
    const response = await getSlots();
    return response.slots;
  },
});

export const slotByIdSelector = selectorFamily({
  key: "slotByIdSelector",
  get:
    (slotId: string) =>
    ({ get }) => {
      const slots = get(slotsSelector);
      const slot = slots.find((x) => x.id == slotId);
      return slot;
    },
});

export const slotsByUserSelector = selectorFamily({
  key: "slotsByUserSelector",
  get:
    (userId: string) =>
    ({ get }) => {
      const slots = get(slotsSelector);
      const userSlots = slots.filter((x) => x.ownerId === userId);
      return userSlots;
    },
});

export const slotByIdAndUserSelector = selectorFamily({
  key: "singleUserSlotSelector",
  get:
    ({ userId, slotId }: { userId: string; slotId: string }) =>
    ({ get }) => {
      const userSlots = get(slotsByUserSelector(userId));
      const userSlot = userSlots.find((x) => x.id === slotId);
      return userSlot;
    },
});
