import { Button, Grid } from "@mui/material";
import { useEffect } from "react";
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from "recoil";
import { ReservationSimpleView } from "../components/reservations/ReservationSimpleView";
import { reservationsByCurrentUserSelector } from "../state/reservationsState";

export function UserReservations(): JSX.Element {
  const reservations = useRecoilValue(reservationsByCurrentUserSelector);
  const refreshReservations = useRecoilRefresher_UNSTABLE(reservationsByCurrentUserSelector);

  useEffect(() => {
    refreshReservations();
  }, []);

  return (
    <>
      <Button onClick={() => refreshReservations()}>Refresh</Button>
      <Grid
        container
        sx={{ padding: "20px", flexDirection: "row" }}
        rowSpacing={5}
        columnSpacing={2}
      >
        {reservations.map((reservation) => (
          <Grid item md={2} key={`${reservation.id}_${reservation.slotId}`}>
            <ReservationSimpleView
              id={reservation.id}
              from={reservation.period.from}
              to={reservation.period.to}
              status={reservation.status}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
