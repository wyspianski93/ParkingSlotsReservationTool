import { Box, Button, Typography, styled } from "@mui/material";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { UserSlotReservations } from "../components/reservations/user-slots/UserSlotReservations";
import { slotByIdAndCurrentUserSelector } from "../state/slots/slotsState";

export function UserSlot(): JSX.Element {
  const params = useParams();

  const userSlot = useRecoilValue(slotByIdAndCurrentUserSelector(params.slotId!))!;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "10px",
        width: "80%",
      }}
    >
      <Box
        sx={{
          border: "2px solid black",
          height: "360px",
          padding: "20px",
          margin: "5px",
          width: "20%",
        }}
      >
        <Typography variant="h2" align="center" padding="20px">
          {userSlot.name}
        </Typography>
        <SlotActionButton
          label="DELETE SLOT"
          onClick={async () => {
            //TODO: delete slot
          }}
        />
        <SlotActionButton
          label="RENAME SLOT"
          onClick={async () => {
            //TODO: rename slot
          }}
        />
        <SlotActionButton
          label="CHANGE AVAILABILITY"
          onClick={async () => {
            //TODO: change availability
          }}
        />
      </Box>
      <Box
        sx={{
          border: "2px solid black",
          height: "360px",
          padding: "20px",
          width: "70%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          overflow: "auto",
          justifyContent: "space-evenly",
        }}
      >
        <UserSlotReservations slotId={userSlot.id} />
      </Box>
    </div>
  );
}

function SlotActionButton({
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
