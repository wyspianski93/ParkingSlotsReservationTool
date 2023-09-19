import { useState } from "react";
import { Navigate } from "react-router";
import { useRecoilValue } from "recoil";
import { Form } from "../components/form/Form";
import { FormActionButton } from "../components/form/FormActionButton";
import { FormErrorContainer } from "../components/form/FormErrorContainer";
import { FormInputField } from "../components/form/FormInputField";
import { FromNavigationLink } from "../components/form/FromNavigationLink";
import { PublicRoutes } from "../routing/publicRotues";
import { authService } from "../services/auth";
import { userAuthorizationState } from "../state/userAuthorizationState";

export function SignIn(): JSX.Element {
  const { isAuthorized } = useRecoilValue(userAuthorizationState);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState("");

  if (isAuthorized) {
    return <Navigate to="/search" />;
  }

  return (
    <Form>
      <FormInputField label={"E-mail"} value={email} onChange={(e) => setEmail(e.target.value)} />
      <FormInputField
        type={"password"}
        label={"Password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormActionButton
        label={"Sign in"}
        onClick={async () => {
          const { error } = await authService.authorize(email, password);
          if (error) {
            setSignInError(error);
          }
        }}
      />
      <FromNavigationLink
        navigateTo={PublicRoutes.Register}
        navigationLabel="Register"
        helperLabel="Don't have an account?"
      />
      {signInError != "" && <FormErrorContainer error={signInError} />}
    </Form>
  );
}
