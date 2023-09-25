import { Reservation } from "./reservation";

export interface Slot {
  id: string;
  name: string;
  ownerName: string;
  ownerId: string;
  reservations: Reservation[];
}
