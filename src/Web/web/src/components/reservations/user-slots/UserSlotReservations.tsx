import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from "recoil";
import { reservationsBySlotSelector } from "../../../state/reservationsState";
import { UserSlotReservation } from "./UserSlotReservation";

export function UserSlotReservations({ slotId }: { slotId: string }): JSX.Element {
  const reservations = useRecoilValue(reservationsBySlotSelector(slotId));
  const refreshReservations = useRecoilRefresher_UNSTABLE(reservationsBySlotSelector(slotId));

  useEffect(() => {
    refreshReservations();
  }, []);

  return (
    <>
      {reservations.length > 0 &&
        reservations.map((reservation) => <UserSlotReservation reservation={reservation} />)}
      {reservations.length === 0 && (
        <Typography variant="h4">You don't have any reservations for this slot.</Typography>
      )}
    </>
  );
}
