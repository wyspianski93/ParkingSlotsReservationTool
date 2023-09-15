import { Navigate } from "react-router";
import { useRecoilValue } from "recoil";
import { userAuthorizationState } from "../state/userAuthorizationState";

export function AuthorizedContent({ children }: { children: JSX.Element }): JSX.Element {
  const { isAuthorized } = useRecoilValue(userAuthorizationState);

  if (!isAuthorized) {
    return <Navigate to={"/signin"}></Navigate>;
  }

  return children;
}
