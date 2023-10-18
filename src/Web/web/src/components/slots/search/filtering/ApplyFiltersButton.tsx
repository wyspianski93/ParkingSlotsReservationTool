import { Button, styled } from "@mui/material";

export function ApplyFiltersButton({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled: boolean;
}): JSX.Element {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {label}
    </StyledButton>
  );
}

const StyledButton = styled(Button)(({ theme }) => ({
  width: "20%",
  height: "20%",
  alignSelf: "center",
  padding: "5px",
  color: "black",
  backgroundColor: "#da8166",
  borderRadius: "30px",
  "&:hover": {
    backgroundColor: "#ec8c6f",
  },
}));
