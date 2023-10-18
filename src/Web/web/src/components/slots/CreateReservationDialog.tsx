import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { slotsFilterState } from "../../state/slots/slotsFilterState";

export function CreateReservationDialog({
  isOpen,
  setIsOpen,
  onConfirm,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: () => void;
}): JSX.Element {
  const navigate = useNavigate();

  const { from, to } = useRecoilValue(slotsFilterState);

  return (
    <Dialog fullWidth maxWidth={"xs"} open={isOpen}>
      <DialogTitle sx={{ backgroundColor: "#FAB49F" }}>{"Create reservation"}</DialogTitle>
      <DialogContent sx={{ backgroundColor: "#FAB49F" }}>
        <Typography>
          Do you want to create a reservation from {from} to {to}?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "#FAB49F" }}>
        <CreateReservationDialogButton
          label="YES"
          onClick={() => {
            onConfirm();
            setIsOpen(false);
            navigate("/slots");
          }}
        />
        <CreateReservationDialogButton label="NO" onClick={() => setIsOpen(false)} />
      </DialogActions>
    </Dialog>
  );
}

function CreateReservationDialogButton({
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
