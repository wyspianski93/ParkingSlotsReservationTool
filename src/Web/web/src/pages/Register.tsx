import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { register } from "../services/register";

export function Register(): JSX.Element {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registrationError, setRegistrationError] = useState("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "10px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#primary",
          border: "2px black solid",
          borderRadius: "25px",
          display: "flex",
          flexDirection: "column",
          width: "40%",
          alignItems: "center",
        }}
      >
        <br></br>
        <TextField
          sx={{ width: "40%", padding: "5px" }}
          label={"Name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          sx={{ width: "40%", padding: "5px" }}
          label={"E-mail"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          sx={{ width: "40%", padding: "5px" }}
          type={"password"}
          label={"Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          color="secondary"
          sx={{ width: "40%", padding: "5px" }}
          onClick={async () => {
            const { isRegistered, error } = await register(name, email, password);
            if (isRegistered) {
              navigate("/signin");
            }
            setRegistrationError(error);
          }}
        >
          Register
        </Button>
        <NavLink style={{ color: "black", width: "40%", padding: "5px" }} to={"/signin"}>
          <Button color={"secondary"} sx={{ width: "100%", padding: "5px" }}>
            Already have the account? Sign in
          </Button>
        </NavLink>
        {registrationError != "" && <RegistrationErrorContainer error={registrationError} />}
      </Box>
    </div>
  );
}

function RegistrationErrorContainer({ error }: { error: string }): JSX.Element {
  return <span style={{ width: "95%", padding: "5px" }}>{error}</span>;
}
