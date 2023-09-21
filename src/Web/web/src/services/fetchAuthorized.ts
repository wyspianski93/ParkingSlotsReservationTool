import { authService } from "./auth";

export async function fetchAuthorized(
  input: RequestInfo | URL,
  init: RequestInit,
): Promise<Response> {
  const token = authService.getAccessToken();

  const customInit = { ...init, headers: { ...init?.headers, Authorization: `Bearer ${token}` } };

  const response = await fetch(input, customInit);

  return response;
}
