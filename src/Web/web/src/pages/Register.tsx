import { useState } from "react";
import { Navigate } from "react-router";
import { Form } from "../components/form/Form";
import { FormActionButton } from "../components/form/FormActionButton";
import { FormErrorContainer } from "../components/form/FormErrorContainer";
import { FormInputField } from "../components/form/FormInputField";
import { FromNavigationLink } from "../components/form/FromNavigationLink";
import { PublicRoutes } from "../routing/publicRoutes";
import { register } from "../services/register";

export function Register(): JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationError, setRegistrationError] = useState("");

  const [hasRegistered, setHasRegistered] = useState(false);

  if (hasRegistered) {
    return <Navigate to={PublicRoutes.SignIn} />;
  }

  return (
    <Form>
      <FormInputField label={"Name"} value={name} onChange={(e) => setName(e.target.value)} />
      <FormInputField label={"E-mail"} value={email} onChange={(e) => setEmail(e.target.value)} />
      <FormInputField
        type={"password"}
        label={"Password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormActionButton
        label={"Register"}
        onClick={async () => {
          const { isRegistered, error } = await register(name, email, password);
          if (isRegistered) {
            setHasRegistered(true);
          }
          setRegistrationError(error);
        }}
      />
      <FromNavigationLink
        navigateTo={PublicRoutes.SignIn}
        helperLabel="Already have an account?"
        navigationLabel="Sign in"
      />
      {registrationError != "" && <FormErrorContainer error={registrationError} />}
    </Form>
  );
}
