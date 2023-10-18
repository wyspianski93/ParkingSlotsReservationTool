import { Grid } from "@mui/material";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { AddSlotButton } from "../components/slots/user-slots/AddSlotButton";
import { AddSlotDialog } from "../components/slots/user-slots/AddSlotDialog";
import { UserSlotSimpleView } from "../components/slots/user-slots/UserSlotSimpleView";
import { slotsByCurrentUserSelector } from "../state/slots/slotsState";

export function UserSlots(): JSX.Element {
  const [addSlotDialogOpen, setAddSlotDialogOpen] = useState(false);

  const slots = useRecoilValue(slotsByCurrentUserSelector);

  return (
    <>
      <Grid
        container
        sx={{ padding: "20px", flexDirection: "row" }}
        rowSpacing={5}
        columnSpacing={2}
      >
        {slots.map((slot) => (
          <Grid item md={2} key={`${slot.id}_${slot.name}`}>
            <UserSlotSimpleView
              id={slot.id}
              name={slot.name}
              owner={slot.ownerName}
              reservationsCount={slot.reservations?.length ?? 0}
            />
          </Grid>
        ))}
      </Grid>
      <AddSlotButton label={"Add slot"} onClick={() => setAddSlotDialogOpen(true)} />
      <AddSlotDialog isOpen={addSlotDialogOpen} setIsOpen={setAddSlotDialogOpen} />
    </>
  );
}
