import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { signIn } from "../services/signIn";
import { userAuthorizationState } from "../state/userAuthorizationState";

export function SignIn(): JSX.Element {
  const [userAuthorization, setUserAuthorization] = useRecoilState(userAuthorizationState);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (userAuthorization.isAuthorized) {
    return <Navigate to={"/home"} />;
  }

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
          variant="outlined"
          sx={{
            width: "40%",
            padding: "5px",
            // "& .MuiFormLabel-root": {
            //   color: "black",
            //   paddingLeft: "5px",
            // },
            // "& .MuiOutlinedInput-root": {
            //   "&.Mui-focused fieldset": {
            //     borderColor: "black",
            //   },
            //   borderColor: "black",
            // },
          }}
          label={"E-mail"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          sx={{ width: "40%", padding: "5px" }}
          type={"password"}
          label={"Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          color={"secondary"}
          sx={{ width: "40%", padding: "5px" }}
          onClick={async () => {
            const { isAuthorized, token } = await signIn(email, password);
            if (isAuthorized) {
              setUserAuthorization({ isAuthorized: isAuthorized, token: token });
              navigate("/home");
            }
          }}
        >
          Sign in
        </Button>
        <NavLink style={{ color: "black", width: "40%", padding: "5px" }} to={"/register"}>
          <Button color={"secondary"} sx={{ width: "100%", padding: "5px" }}>
            Don't have an acount? Register
          </Button>
        </NavLink>
      </Box>
    </div>
  );
}
