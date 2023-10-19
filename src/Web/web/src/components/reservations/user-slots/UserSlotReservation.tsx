import { Box, Button, styled } from "@mui/material";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { Reservation, ReservationStatus } from "../../../models/reservation";
import { acceptReservation, cancelReservation } from "../../../services/reservations";
import { reservationsBySlotSelector } from "../../../state/reservationsState";

export function UserSlotReservation({ reservation }: { reservation: Reservation }): JSX.Element {
  const refreshReservation = useRecoilRefresher_UNSTABLE(
    reservationsBySlotSelector(reservation.slotId),
  );
  return (
    <Box
      sx={{
        border: "2px solid black",
        height: "160px",
        width: "160px",
        margin: "5px",
      }}
    >
      {/* TODO: change reserved by from id to name */}
      <span>reserved by: {reservation.reservedById}</span>
      <span> -- </span>
      <span>status: {ReservationStatus[reservation.status]}</span>
      {/* /TODO: restrict buttons availability based on status */}
      <div style={{ display: "flex", flexDirection: "row" }}>
        <ReservationActionButton
          label="ACCEPT"
          onClick={async () => {
            await acceptReservation(reservation.id);
            refreshReservation();
          }}
        />
        <ReservationActionButton
          label="CANCEL"
          onClick={async () => {
            await cancelReservation(reservation.id);
            refreshReservation();
          }}
        />
      </div>
    </Box>
  );
}

function ReservationActionButton({
  label,
  onClick,
}: {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}): JSX.Element {
  return <StyledButton onClick={onClick}>{label}</StyledButton>;
}

const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: "10px",
  margin: "auto",
  marginTop: "10px",
  width: "30%",
  padding: "8px",
  color: "black",
  backgroundColor: "#da8166",
  borderRadius: "30px",
  "&:hover": {
    backgroundColor: "#ec8c6f",
  },
}));
