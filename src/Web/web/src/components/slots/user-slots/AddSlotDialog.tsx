import { AddCircleOutline } from "@material-ui/icons";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
} from "@mui/material";
import { useState } from "react";
import { addSlot } from "../../../services/slots";
import { InputField } from "../../InputField";

export type AvailabilityPeriod = Record<string, { from: string; to: string }>;

const availabilityPeriodsInitialState = {
  [crypto.randomUUID()]: { from: "", to: "" },
};

export function AddSlotDialog({
  isOpen,
  setIsOpen,
  onAdded,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onAdded: () => void;
}): JSX.Element {
  const [slotName, setSlotName] = useState("");

  const [availabilityPeriods, setAvailabilityPeriods] = useState<AvailabilityPeriod>(
    availabilityPeriodsInitialState,
  );
  const [error, setError] = useState<string | undefined>(undefined);

  return (
    <Dialog fullWidth maxWidth={"xs"} open={isOpen}>
      <DialogTitle sx={{ backgroundColor: "#FAB49F" }}>{"Add new slot"}</DialogTitle>
      <DialogContent sx={{ backgroundColor: "#FAB49F" }}>
        <InputField
          width="80%"
          label={"Name"}
          value={slotName}
          onChange={(e) => setSlotName(e.target.value)}
          sx={{ marginBottom: "20px" }}
        />
        <span>Availability periods</span>
        {Object.keys(availabilityPeriods).map((id) => (
          <div style={{ display: "flex", marginTop: "5px" }} key={id}>
            <InputField
              width="50%"
              label={"from"}
              value={availabilityPeriods[id].from}
              onChange={(e) => {
                setAvailabilityPeriods((periods) => ({
                  ...periods,
                  [id]: { from: e.target.value, to: periods[id].to },
                }));
              }}
            />
            <InputField
              width="50%"
              label={"to"}
              value={availabilityPeriods[id].to}
              onChange={(e) => {
                setAvailabilityPeriods((periods) => ({
                  ...periods,
                  [id]: { to: e.target.value, from: periods[id].from },
                }));
              }}
            />
          </div>
        ))}
        <IconButton
          disableRipple
          onClick={() =>
            setAvailabilityPeriods((periods) => ({
              ...periods,
              [crypto.randomUUID()]: { from: "", to: "" },
            }))
          }
        >
          <AddCircleOutline fontSize="small"></AddCircleOutline>
        </IconButton>
        {error && <div>{error}</div>}
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "#FAB49F" }}>
        <AddSlotDialogButton
          label={"Add"}
          onClick={async () => {
            const result = await addSlot(slotName, Object.values(availabilityPeriods));
            if (result.error) {
              setError(result.error);
              return;
            }
            setIsOpen(false);
            onAdded();
          }}
        />
        <AddSlotDialogButton
          label={"Close"}
          onClick={() => {
            setIsOpen(false);
          }}
        />
      </DialogActions>
    </Dialog>
  );
}

function AddSlotDialogButton({
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
