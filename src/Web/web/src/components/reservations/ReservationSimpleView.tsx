import { Box, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { Reservation, ReservationStatus } from "../../models/reservation";
import { slotByIdSelector } from "../../state/slots/slotsState";

export function ReservationSimpleView({ reservation }: { reservation: Reservation }): JSX.Element {
  const slotInfo = useRecoilValue(slotByIdSelector(reservation.slotId));

  return (
    <Box
      sx={{
        border: "2px solid black",
        // height: "160px",
        // width: "120px",
      }}
    >
      <Typography variant="h6" sx={{ padding: "5px" }}>
        {slotInfo?.name}
      </Typography>
      <span>owner name: {slotInfo?.ownerName} </span>
      <span>from: {reservation.period.from}</span>
      <br></br>
      <span>to: {reservation.period.to}</span>
      <br></br>
      <span>status: {ReservationStatus[reservation.status]}</span>
    </Box>
  );
}
