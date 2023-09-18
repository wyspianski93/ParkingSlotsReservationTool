import { Box, styled } from "@mui/material";

export function Form({ children }: { children: React.ReactNode }): JSX.Element {
  return <StyledBox>{children}</StyledBox>;
}

const StyledBox = styled(Box)({
  margin: "auto",
  marginTop: "10px",
  paddingTop: "10px",
  alignContent: "center",
  border: "2px black solid",
  borderRadius: "25px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "40%",
  alignItems: "center",
});
