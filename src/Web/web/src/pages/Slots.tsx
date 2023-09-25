import { Grid } from "@mui/material";
import { useRecoilValue } from "recoil";
import { SlotSimpleView } from "../components/slots/SlotSimpleView";
import { slotsSelector } from "../state/slotsState";

export function Slots(): JSX.Element {
  const slots = useRecoilValue(slotsSelector);

  return (
    <Grid container sx={{ padding: "20px", flexDirection: "row" }} rowSpacing={5} columnSpacing={2}>
      {slots.map((slot) => (
        <Grid item md={2}>
          <SlotSimpleView
            id={slot.id}
            name={slot.name}
            owner={slot.ownerName}
            reservationsCount={slot.reservations?.length ?? 0}
          />
        </Grid>
      ))}
    </Grid>
  );
}
