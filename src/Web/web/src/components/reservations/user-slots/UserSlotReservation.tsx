import { Button } from "@mui/material";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { Reservation, ReservationStatus } from "../../../models/reservation";
import { acceptReservation } from "../../../services/reservations";
import { reservationsBySlotSelector } from "../../../state/reservationsState";

export function UserSlotReservation({ reservation }: { reservation: Reservation }): JSX.Element {
  const refreshReservation = useRecoilRefresher_UNSTABLE(
    reservationsBySlotSelector(reservation.slotId),
  );
  return (
    <>
      <span>id: {reservation.id}</span>
      <span> -- </span>
      <span>status: {ReservationStatus[reservation.status]}</span>
      <Button
        onClick={async () => {
          await acceptReservation(reservation.id);
          refreshReservation();
        }}
      >
        accept reservation
      </Button>
      <br></br>
    </>
  );
}
