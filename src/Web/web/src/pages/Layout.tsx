import { Divider, styled } from "@mui/material";
import { Outlet } from "react-router";
import { Menu } from "../components/menu/Menu";

export function Layout(): JSX.Element {
  return (
    <StyledLayout>
      <Menu />
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
