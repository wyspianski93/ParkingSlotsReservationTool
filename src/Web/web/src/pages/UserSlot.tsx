import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { UserSlotReservations } from "../components/reservations/user-slots/UserSlotReservations";
import { slotByIdAndCurrentUserSelector } from "../state/slots/slotsState";

export function UserSlot(): JSX.Element {
  const params = useParams();

  const userSlot = useRecoilValue(slotByIdAndCurrentUserSelector(params.slotId!))!;

  return (
    <>
      <span>name: {userSlot.name}</span>
      <br></br>
      <span>owner name: {userSlot.ownerName}</span>
      <br></br>
      <span>reservations: {userSlot.reservations?.length ?? 0}</span>
      <UserSlotReservations slotId={userSlot.id} />
    </>
  );
}
