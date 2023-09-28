import { ReservableSlotsList } from "../components/slots/search/ReservableSlotsList";
import { SlotsFilters } from "../components/slots/search/SlotsFilters";

export function Slots(): JSX.Element {
  return (
    <>
      <SlotsFilters />
      <ReservableSlotsList />
    </>
  );
}
