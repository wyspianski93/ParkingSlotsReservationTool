import { authService } from "./auth";

export interface Slot {
  name: string;
  ownerId: string;
}

export async function getSlots(): Promise<{ slots: Slot[]; error: string }> {
  const requestUrl = "http://localhost:5267/slots";

  let response: Response;

  const token = authService.getAccessToken();

  try {
    response = await fetch(requestUrl, {
      method: "get",
      headers: { "content-type": "application/json", Authorization: `Bearer ${token}` },
    });
  } catch (e) {
    return { slots: [], error: "Could not connect to slots service." };
  }

  if (response.status != 200) {
    return { slots: [], error: "Error occured." };
  }

  const resultJson = await response.json();

  const slots: Slot[] = resultJson as Slot[];

  return { slots, error: "" };
}
