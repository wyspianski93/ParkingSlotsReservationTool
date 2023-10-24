import { Button, Grid, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from "recoil";
import { AddSlotDialog } from "../components/slots/user-slots/AddSlotDialog";
import { UserSlotSimpleView } from "../components/slots/user-slots/UserSlotSimpleView";
import { slotsByCurrentUserSelector } from "../state/slots/slotsState";

export function UserSlots(): JSX.Element {
  const [isAddSlotDialogOpen, setIsAddSlotDialogOpen] = useState(false);

  const slots = useRecoilValue(slotsByCurrentUserSelector);
  const refreshSlots = useRecoilRefresher_UNSTABLE(slotsByCurrentUserSelector);

  useEffect(() => {
    refreshSlots();
  }, []);

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
      <AddSlotButton label={"Add slot"} onClick={() => setIsAddSlotDialogOpen(true)} />
      {isAddSlotDialogOpen && (
        <AddSlotDialog
          isOpen={isAddSlotDialogOpen}
          setIsOpen={setIsAddSlotDialogOpen}
          onAdded={refreshSlots}
        />
      )}
    </>
  );
}

function AddSlotButton({
  label,
  onClick,
}: {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}): JSX.Element {
  return <StyledButton onClick={onClick}>{label}</StyledButton>;
}

const StyledButton = styled(Button)(({ theme }) => ({
  width: "20%",
  alignSelf: "center",
  padding: "5px",
  color: "black",
  backgroundColor: "#da8166",
  borderRadius: "30px",
  "&:hover": {
    backgroundColor: "#ec8c6f",
  },
}));
