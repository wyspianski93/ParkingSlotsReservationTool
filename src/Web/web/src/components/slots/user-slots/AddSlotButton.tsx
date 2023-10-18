import styled from "@emotion/styled";
import { Button } from "@mui/material";

export function AddSlotButton({
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
