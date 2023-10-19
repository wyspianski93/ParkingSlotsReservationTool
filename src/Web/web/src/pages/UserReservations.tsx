import { Button, Grid, styled } from "@mui/material";
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
      <RefreshButton label="REFRESH" onClick={() => refreshReservations()} />
      <Grid
        container
        sx={{ padding: "20px", flexDirection: "row" }}
        rowSpacing={5}
        columnSpacing={2}
      >
        {reservations.map((reservation) => (
          <Grid item md={2} key={`${reservation.id}_${reservation.slotId}`}>
            <ReservationSimpleView reservation={reservation} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

//TODO: unify all buttons
function RefreshButton({
  label,
  onClick,
}: {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}): JSX.Element {
  return <StyledButton onClick={onClick}>{label}</StyledButton>;
}

const StyledButton = styled(Button)(({ theme }) => ({
  margin: "auto",
  marginTop: "10px",
  width: "20%",
  padding: "8px",
  color: "black",
  backgroundColor: "#da8166",
  borderRadius: "30px",
  "&:hover": {
    backgroundColor: "#ec8c6f",
  },
}));
