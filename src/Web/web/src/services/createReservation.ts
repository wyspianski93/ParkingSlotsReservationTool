import { fetchAuthorized } from "./fetchAuthorized";

export async function createReservation(
  slotId: string,
  from: string,
  to: string,
): Promise<{ error: string }> {
  const requestUrl = "http://localhost:5111/reservations/create";

  let response: Response;

  try {
    response = await fetchAuthorized(requestUrl, {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ slotId, from, to }),
    });
  } catch (e) {
    return { error: "Could not connect to reservations service." };
  }

  if (response.status != 200) {
    return { error: "Error occured." };
  }

  const resultJson = await response.json();

  return { error: "" };
}
