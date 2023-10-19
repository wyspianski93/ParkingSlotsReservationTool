import { Box, Button, Typography, styled } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { CreateReservationDialog } from "../components/slots/CreateReservationDialog";
import { createReservation } from "../services/reservations";
import { slotsFilterState } from "../state/slots/slotsFilterState";
import { slotByIdSelector } from "../state/slots/slotsState";

export function Slot(): JSX.Element {
  const params = useParams();

  const [isCreateReservationDialogOpen, setIsCreateReservationDialogOpen] = useState(false);

  const slot = useRecoilValue(slotByIdSelector(params.slotId!))!;

  const { from, to } = useRecoilValue(slotsFilterState);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}
    >
      <Box
        sx={{
          border: "2px solid black",
          height: "360px",
          width: "220px",
        }}
      >
        <Typography variant="h2" align="center" padding="20px">
          {slot.name}
        </Typography>
        <Typography variant="h5" padding="5px">
          owner name: {slot.ownerName}
        </Typography>
        <Typography variant="h5" padding="5px">
          from: {from}
        </Typography>
        <Typography variant="h5" padding="5px">
          to: {to}
        </Typography>
        <ReserveButton
          label="RESERVE"
          onClick={async () => {
            setIsCreateReservationDialogOpen(true);
          }}
        />
        <CreateReservationDialog
          isOpen={isCreateReservationDialogOpen}
          setIsOpen={setIsCreateReservationDialogOpen}
          onConfirm={async () => await createReservation(slot.id, from, to)}
        />
      </Box>
    </div>
  );
}

function ReserveButton({
  label,
  onClick,
}: {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}): JSX.Element {
  return <StyledButton onClick={onClick}>{label}</StyledButton>;
}

const StyledButton = styled(Button)(({ theme }) => ({
  display: "block",
  margin: "auto",
  marginTop: "10px",
  width: "90%",
  padding: "8px",
  color: "black",
  backgroundColor: "#da8166",
  borderRadius: "30px",
  "&:hover": {
    backgroundColor: "#ec8c6f",
  },
}));
