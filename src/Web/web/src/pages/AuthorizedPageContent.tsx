import { Navigate } from "react-router";
import { useRecoilValue } from "recoil";
import { PublicRoutes } from "../routing/routes";
import { userAuthorizationState } from "../state/userAuthorizationState";

export function AuthorizedPageContent({ children }: { children: JSX.Element }): JSX.Element {
  const { isAuthorized } = useRecoilValue(userAuthorizationState);

  if (!isAuthorized) {
    return <Navigate to={PublicRoutes.SignIn}></Navigate>;
  }

  return children;
}
