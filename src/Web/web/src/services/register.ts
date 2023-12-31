export async function register(
  name: string,
  email: string,
  password: string,
): Promise<{ isRegistered: boolean; error: string }> {
  const requestUrl = "http://localhost:7132/users/create";

  let response: Response;

  try {
    response = await fetch(requestUrl, {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
  } catch (e) {
    return { isRegistered: false, error: "Could not connect to registering service." };
  }

  const registeringResult = await response.text();

  if (response.status != 200) {
    return { isRegistered: false, error: "Error occured." };
  }

  return { isRegistered: true, error: "" };
}
