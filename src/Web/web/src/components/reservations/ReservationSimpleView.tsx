import { Box, Typography } from "@mui/material";
import { ReservationStatus } from "../../models/reservation";

export function ReservationSimpleView({
  id,
  from,
  to,
  status,
}: {
  id: string;
  from: string;
  to: string;
  status: ReservationStatus;
}): JSX.Element {
  return (
    <Box
      sx={{
        border: "2px solid black",
        // height: "160px",
        // width: "120px",
      }}
    >
      <Typography variant="h6" sx={{ padding: "5px" }}>
        {id}
      </Typography>
      <span>from: {from}</span>
      <br></br>
      <span>to: {to}</span>
      <br></br>
      <span>status: {ReservationStatus[status]}</span>
    </Box>
  );
}
