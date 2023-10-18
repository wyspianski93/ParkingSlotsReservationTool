import { Divider } from "@mui/material";
import { ReservableSlotsList } from "../components/slots/search/ReservableSlotsList";
import { SlotsFilters } from "../components/slots/search/filtering/SlotsFilters";

export function Slots(): JSX.Element {
  return (
    <>
      <SlotsFilters />
      <Divider sx={{ height: "2px" }} />
      <ReservableSlotsList />
    </>
  );
}
