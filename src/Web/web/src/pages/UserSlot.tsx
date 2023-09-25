import { Button } from "@mui/material";
import { useParams } from "react-router";
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from "recoil";
import { Reservation, ReservationStatus } from "../models/reservation";
import { authService } from "../services/auth";
import { acceptReservation } from "../services/reservations";
import { reservationsBySlotSelector } from "../state/reservationsState";
import { slotByIdAndUserSelector, slotsSelector } from "../state/slotsState";

export function UserSlot(): JSX.Element {
  const params = useParams();

  const userSlot = useRecoilValue(
    slotByIdAndUserSelector({ userId: authService.getUserId(), slotId: params.slotId! }),
  )!;

  const refreshSlots = useRecoilRefresher_UNSTABLE(slotsSelector);

  return (
    <>
      <span>name: {userSlot.name}</span>
      <br></br>
      <span>owner name: {userSlot.ownerName}</span>
      <br></br>
      <span>reservations: {userSlot.reservations?.length ?? 0}</span>
      <SlotReservations slotId={userSlot.id} />
    </>
  );
}

function SlotReservations({ slotId }: { slotId: string }): JSX.Element {
  const reservations = useRecoilValue(reservationsBySlotSelector(slotId));

  return (
    <div>
      {reservations.map((reservation) => (
        <SlotReservation reservation={reservation} />
      ))}
    </div>
  );
}

function SlotReservation({ reservation }: { reservation: Reservation }): JSX.Element {
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
