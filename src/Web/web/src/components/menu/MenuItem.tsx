import { SvgIconComponent } from "@material-ui/icons";
import { styled } from "@mui/material";
import { NavLink } from "react-router-dom";

export interface MenuNavigationItemProps {
  navigationPath: string;
  Icon: SvgIconComponent;
  name: string;
}

export function MenuNavigationItem({
  navigationPath,
  Icon,
  name,
}: MenuNavigationItemProps): JSX.Element {
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
      <StyledMenuNavigationItem>
        <Icon />
        <span>{name}</span>
      </StyledMenuNavigationItem>
    </NavLink>
  );
}

const StyledMenuNavigationItem = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginLeft: "15px",
});
