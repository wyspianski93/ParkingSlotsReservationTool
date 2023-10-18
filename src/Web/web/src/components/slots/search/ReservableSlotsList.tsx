import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from "recoil";
import { slotsFilterState } from "../../../state/slots/slotsFilterState";
import { reservableSlotsByNotCurrentUserSelector } from "../../../state/slots/slotsState";
import { SlotSimpleView } from "./SlotSimpleView";

export function ReservableSlotsList(): JSX.Element {
  const { to, from } = useRecoilValue(slotsFilterState);
  const reservableSlots = useRecoilValue(reservableSlotsByNotCurrentUserSelector);

  const refresh = useRecoilRefresher_UNSTABLE(reservableSlotsByNotCurrentUserSelector);

  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      <span>
        Slots available to reserve from {from} to {to}
      </span>
      <Grid
        container
        sx={{ padding: "20px", flexDirection: "row" }}
        rowSpacing={5}
        columnSpacing={2}
      >
        {reservableSlots.map((slot) => (
          <Grid item md={2} key={`${slot.id}_${slot.ownerId}`}>
            <SlotSimpleView
              id={slot.id}
              name={slot.name}
              owner={slot.ownerName}
              reservationsCount={slot.reservations?.length ?? 0}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
