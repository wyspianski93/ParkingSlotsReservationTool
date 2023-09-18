import { Divider, Typography, styled } from "@mui/material";
import { Outlet } from "react-router";

export function Layout(): JSX.Element {
  return (
    <StyledLayout>
      <TopMenu />
      <br></br>
      <Divider></Divider>
      <Outlet></Outlet>
    </StyledLayout>
  );
}

const StyledLayout = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: "100%",
  marginLeft: "auto",
  marginRight: "auto",
}));

function TopMenu(): JSX.Element {
  return (
    <Typography sx={{ padding: "5px", paddingTop: "10px" }} variant="h4">
      PARKING SLOTS RESERVATIONS
    </Typography>
  );
}
