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
            //TODO: add tests for rejected scenario
            return slot
                    .Reservations
                    .Select(reservation => new { period = reservation.ReservationPeriod, status = reservation.ReservationStatus })
                    .All(reservation => reservation.status == ReservationStatus.Rejected || !(reservation.period.From <= to && from <= reservation.period.To));
        }
    }
}
