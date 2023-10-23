import { atom } from "recoil";

export const slotsFilterState = atom({
  key: "slotsFilterState",
  default: { from: "2022-01-01", to: "2022-01-01" },
});
