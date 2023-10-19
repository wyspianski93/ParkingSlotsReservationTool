import { Box, Button, Typography, styled } from "@mui/material";
import { NavLink } from "react-router-dom";

export function SlotSimpleView({
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

      <NavLink to={`/slots/${id}`} style={{ textDecoration: "none" }}>
        <DetailsButton label="Details" />
      </NavLink>
    </Box>
  );
}

function DetailsButton({ label }: { label: string }): JSX.Element {
  return <StyledButton>{label}</StyledButton>;
}

const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: "10px",
  display: "block",
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
