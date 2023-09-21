import { fetchAuthorized } from "./fetchAuthorized";

export interface Slot {
  id: string;
  name: string;
  ownerName: string;
  reservations: { id: string }[];
}

export async function getSlots(): Promise<{ slots: Slot[]; error: string }> {
  const requestUrl = `http://localhost:5267/slots`;

  let response: Response;

  try {
    response = await fetchAuthorized(requestUrl, {
      method: "get",
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

export async function getSlot(slotId: string): Promise<{ slot: Slot | undefined; error: string }> {
  const requestUrl = `http://localhost:5267/slots/${slotId}`;

  let response: Response;

  try {
    response = await fetchAuthorized(requestUrl, {
      method: "get",
    });
  } catch (e) {
    return { slot: undefined, error: "Could not connect to slots service." };
  }

  if (response.status != 200) {
    return { slot: undefined, error: "Error occured." };
  }

  const resultJson = await response.json();

  const slot: Slot = resultJson as Slot;

  return { slot, error: "" };
}
