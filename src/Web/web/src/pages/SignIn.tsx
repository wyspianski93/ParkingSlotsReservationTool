import { useState } from "react";
import { Navigate } from "react-router";
import { useRecoilState } from "recoil";
import { Form } from "../components/form/Form";
import { FormActionButton } from "../components/form/FormActionButton";
import { FormErrorContainer } from "../components/form/FormErrorContainer";
import { FormInputField } from "../components/form/FormInputField";
import { FromNavigationLink } from "../components/form/FromNavigationLink";
import { signIn } from "../services/signIn";
import { userAuthorizationState } from "../state/userAuthorizationState";

export function SignIn(): JSX.Element {
  const [userAuthorization, setUserAuthorization] = useRecoilState(userAuthorizationState);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState("");

  if (userAuthorization.isAuthorized) {
    return <Navigate to={"/home"} />;
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
          const { isAuthorized, token, error } = await signIn(email, password);
          if (isAuthorized) {
            setUserAuthorization({ isAuthorized: isAuthorized, token: token });
          }
          setSignInError(error);
        }}
      />
      <FromNavigationLink
        navigateTo="/register"
        navigationLabel="Register"
        helperLabel="Don't have an account?"
      />
      {signInError != "" && <FormErrorContainer error={signInError} />}
    </Form>
  );
}
