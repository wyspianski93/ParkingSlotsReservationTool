import { Button, Grid } from "@mui/material";
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from "recoil";
import { ReservationSimpleView } from "../components/reservations/ReservationSimpleView";
import { authService } from "../services/auth";
import { reservationsByUserSelector } from "../state/reservationsState";

export function UserReservations(): JSX.Element {
  const reservations = useRecoilValue(reservationsByUserSelector(authService.getUserId()));
  const refreshReservations = useRecoilRefresher_UNSTABLE(
    reservationsByUserSelector(authService.getUserId()),
  );

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
          <Grid item md={2}>
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
