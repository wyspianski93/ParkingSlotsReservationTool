export async function signIn(
  email: string,
  password: string,
): Promise<{ isAuthorized: boolean; token: string; error: string }> {
  const requestUrl = "http://localhost:7132/signin";

  let response: Response;

  try {
    response = await fetch(requestUrl, {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  } catch (e) {
    return { isAuthorized: false, token: "", error: "Could not connect to signing service." };
  }

  if (response.status != 200) {
    return { isAuthorized: false, token: "", error: "Error occured." };
  }

  const token = await response.json();

  return { isAuthorized: true, token: token as string, error: "" };
}
