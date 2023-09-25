import { Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export function UserSlotSimpleView({
  id,
  name,
  owner,
  reservationsCount,
}: {
  id: string;
  name: string;
  owner: string;
  reservationsCount: number;
}): JSX.Element {
  return (
    <Box
      sx={{
        border: "2px solid black",
        height: "160px",
        width: "120px",
      }}
    >
      <Typography variant="h5" sx={{ padding: "5px" }}>
        {name}
      </Typography>
      <span>owner: {owner}</span>
      <br></br>
      <span>reservations: {reservationsCount}</span>

      <NavLink to={`/user-slots/${id}`}>
        <Button sx={{ color: "black" }}>Details</Button>
      </NavLink>
    </Box>
  );
}
