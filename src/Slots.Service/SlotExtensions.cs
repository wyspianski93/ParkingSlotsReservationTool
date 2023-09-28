using Slots.Service.Models;

namespace Slots.Service
{
    public static class SlotExtensions
    {
        public static bool HasAvailabilityPeriodMatchingRequestedPeriod(this Slot slot, DateOnly from, DateOnly to)
        {
            return slot
                .AvailabilityPeriods
                .Any(availabilityPeriod => from >= availabilityPeriod.From && to <= availabilityPeriod.To);
        }

        public static bool HasNoReservationsOverlappingWithRequestedPeriod(this Slot slot, DateOnly from, DateOnly to)
        {
            return slot
                .Reservations
                .Select(reservation => reservation.ReservationPeriod)
                .All(reservationPeriod => !(reservationPeriod.From <= to && from <= reservationPeriod.To));
        }
    }
}
