import { Button, Typography, styled } from "@mui/material";
import { NavLink } from "react-router-dom";

export function FromNavigationLink({
  navigateTo,
  helperLabel,
  navigationLabel,
}: {
  navigateTo: string;
  helperLabel: string;
  navigationLabel: string;
}): JSX.Element {
  return (
    <FormNavigationLinkContainer>
      <Typography fontSize={"12px"}>{helperLabel}</Typography>
      <NavLink style={{ color: "black", padding: "5px" }} to={navigateTo}>
        <Button color={"secondary"} sx={{ fontSize: "12px", padding: "5px" }}>
          <Typography
            sx={{
              fontSize: "12px",
              color: "black",
              textDecoration: "underline",
              "&:hover": {
                color: "#b68272",
              },
            }}
          >
            {navigationLabel}
          </Typography>
        </Button>
      </NavLink>
    </FormNavigationLinkContainer>
  );
}

const FormNavigationLinkContainer = styled("div")({
  marginTop: "5px",
  marginBottom: "5px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
});
