import { Reservation } from "../models/reservation";
import { fetchAuthorized } from "./fetchAuthorized";

export type ReservationFilter = { type: "reservedById" | "slotId"; value: string };

export async function getReservations(reservationFilter: ReservationFilter): Promise<{
  reservations: Reservation[];
  error: string;
}> {
  const requestUrl = `http://localhost:5111/reservations?${reservationFilter.type}=${reservationFilter.value}`;

  let response: Response;

  try {
    response = await fetchAuthorized(requestUrl, {
      method: "get",
    });
  } catch (e) {
    return { reservations: [], error: "Could not connect to slots service." };
  }

  if (response.status != 200) {
    return { reservations: [], error: "Error occured." };
  }

  const resultJson = await response.json();

  const reservations: Reservation[] = resultJson as Reservation[];

  return { reservations, error: "" };
}

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

export async function acceptReservation(reservationId: string): Promise<{ error: string }> {
  const requestUrl = `http://localhost:5111/reservations/${reservationId}/accept`;

  let response: Response;

  try {
    response = await fetchAuthorized(requestUrl, {
      method: "post",
      headers: { "content-type": "application/json" },
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

export async function cancelReservation(reservationId: string): Promise<{ error: string }> {
  const requestUrl = `http://localhost:5111/reservations/${reservationId}/cancel`;

  let response: Response;

  try {
    response = await fetchAuthorized(requestUrl, {
      method: "post",
      headers: { "content-type": "application/json" },
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
