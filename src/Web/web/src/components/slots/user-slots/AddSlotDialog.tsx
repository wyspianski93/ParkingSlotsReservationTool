import { AddCircleOutline } from "@material-ui/icons";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useState } from "react";
import { InputField } from "../../InputField";
import { AddSlotButton } from "./AddSlotButton";

type AvailabilityPeriod = Record<string, { from: string; to: string }>;

export function AddSlotDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}): JSX.Element {
  const [availabilityPeriods, setAvailabilityPeriods] = useState<AvailabilityPeriod>({
    [crypto.randomUUID()]: { from: "", to: "" },
  });

  return (
    <Dialog fullWidth maxWidth={"xs"} open={isOpen}>
      <DialogTitle sx={{ backgroundColor: "#FAB49F" }}>{"Add new slot"}</DialogTitle>
      <DialogContent sx={{ backgroundColor: "#FAB49F" }}>
        <InputField width="80%" label={"Name"} sx={{ marginBottom: "20px" }} />
        <span>Availability periods</span>
        {Object.keys(availabilityPeriods).map((id) => (
          <div style={{ display: "flex", marginTop: "5px" }}>
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
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "#FAB49F" }}>
        <AddSlotButton label={"Add"} onClick={() => setIsOpen(false)} />
        <AddSlotButton label={"Close"} onClick={() => setIsOpen(false)} />
      </DialogActions>
    </Dialog>
  );
}
