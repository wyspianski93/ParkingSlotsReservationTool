import { Box, Button, Grid, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { slotsSelector } from "../state/slotsState";
import BaseViewPaper from "./BaseViewPaper";

export function Slots(): JSX.Element {
  const slots = useRecoilValue(slotsSelector);

  return (
    <BaseViewPaper>
      <Grid
        container
        sx={{ padding: "20px", flexDirection: "row" }}
        rowSpacing={5}
        columnSpacing={2}
      >
        {slots.map((slot) => (
          <Grid item md={2}>
            <SlotSimpleView
              id={slot.id}
              name={slot.name}
              owner={slot.ownerName}
              reservationsCount={slot.reservations?.length ?? 0}
            ></SlotSimpleView>
          </Grid>
        ))}
      </Grid>
    </BaseViewPaper>
  );
}

function SlotSimpleView({
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

      <NavLink to={`/slots/${id}`}>
        <Button sx={{ color: "black" }}>Details</Button>
      </NavLink>
    </Box>
  );
}
