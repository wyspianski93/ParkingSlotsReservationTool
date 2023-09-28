import { Button } from "@mui/material";
import { useParams } from "react-router";
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from "recoil";
import { createReservation } from "../services/reservations";
import { slotsFilterState } from "../state/slots/slotsFilterState";
import { slotByIdSelector, slotsSelector } from "../state/slots/slotsState";

export function Slot(): JSX.Element {
  const params = useParams();

  const slot = useRecoilValue(slotByIdSelector(params.slotId!))!;

  const { from, to } = useRecoilValue(slotsFilterState);

  const refreshSlots = useRecoilRefresher_UNSTABLE(slotsSelector);

  return (
    <>
      <span>name: {slot.name}</span>
      <br></br>
      <span>owner name: {slot.ownerName}</span>
      <br></br>
      <span>reservations: {slot.reservations?.length ?? 0}</span>
      <Button
        onClick={async () => {
          await createReservation(slot.id, from, to);
          refreshSlots();
        }}
      >
        RESERVE
      </Button>
    </>
  );
}
