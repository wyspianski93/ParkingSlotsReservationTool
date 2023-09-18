import { SvgIconComponent } from "@material-ui/icons";
import { styled } from "@mui/material";
import { NavLink } from "react-router-dom";

export interface MenuItemProps {
  navigationPath: string;
  Icon: SvgIconComponent;
  name: string;
}

export function MenuItem({ navigationPath, Icon, name }: MenuItemProps): JSX.Element {
  return (
    <NavLink
      to={navigationPath}
      style={({ isActive }) => {
        return {
          color: isActive ? "#958a8e" : "black",
          textDecoration: isActive ? "underline" : "none",
        };
      }}
    >
      <StyledMenuItem>
        <Icon />
        <span>{name}</span>
      </StyledMenuItem>
    </NavLink>
  );
}

const StyledMenuItem = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginLeft: "15px",
});
