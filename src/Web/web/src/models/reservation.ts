export enum ReservationStatus {
  pending = 0,
  confirmed = 1,
  canceled = 2,
}
export interface Reservation {
  id: string;
  reservedById: string;
  slotId: string;
  status: ReservationStatus;
  period: { from: string; to: string };
}
