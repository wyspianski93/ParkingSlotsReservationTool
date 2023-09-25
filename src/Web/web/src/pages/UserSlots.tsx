import { Grid } from "@mui/material";
import { useRecoilValue } from "recoil";
import { UserSlotSimpleView } from "../components/slots/UserSlotSimpleView";
import { authService } from "../services/auth";
import { slotsByUserSelector } from "../state/slotsState";

export function UserSlots(): JSX.Element {
  const slots = useRecoilValue(slotsByUserSelector(authService.getUserId()));

  return (
    <Grid container sx={{ padding: "20px", flexDirection: "row" }} rowSpacing={5} columnSpacing={2}>
      {slots.map((slot) => (
        <Grid item md={2}>
          <UserSlotSimpleView
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
