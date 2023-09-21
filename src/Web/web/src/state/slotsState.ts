import { selector, selectorFamily } from "recoil";
import { getSlots } from "../services/getSlots";

export const slotsSelector = selector({
  key: "slotsSelector",
  get: async ({ get }) => {
    const response = await getSlots();
    return response.slots;
  },
});

export const singleSlotSelector = selectorFamily({
  key: "singleSlotSelector",
  get:
    (slotId: string) =>
    ({ get }) => {
      const slots = get(slotsSelector);
      const slot = slots.find((x) => x.id == slotId);
      return slot;
    },
});
