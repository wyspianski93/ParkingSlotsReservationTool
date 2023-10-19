export enum ReservationStatus {
  pending = 0,
  confirmed = 1,
  rejected = 2,
}

//TODO extract reservation for slot and for reservation
export interface Reservation {
  id: string;
  reservedById: string;
  slotId: string;
  status: ReservationStatus;
  period: { from: string; to: string };
}
