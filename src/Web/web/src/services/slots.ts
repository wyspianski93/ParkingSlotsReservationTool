import { Slot } from "../models/slot";
import { fetchAuthorized } from "./fetchAuthorized";

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

export async function getReservableSlots(
  from: string,
  to: string,
): Promise<{ slots: Slot[] | undefined; error: string }> {
  const requestUrl = `http://localhost:5267/slots/reservable?from=${from}&to=${to}`;

  let response: Response;

  try {
    response = await fetchAuthorized(requestUrl, {
      method: "get",
    });
  } catch (e) {
    return { slots: undefined, error: "Could not connect to slots service." };
  }

  if (response.status != 200) {
    return { slots: undefined, error: "Error occured." };
  }

  const resultJson = await response.json();

  const slots: Slot[] = resultJson as Slot[];

  return { slots, error: "" };
}
