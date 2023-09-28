using Slots.Service.Models;

namespace Slots.Service
{
    public interface IReservableSlotsProvider
    {
        IReadOnlyCollection<Slot> GetReservableSlots(IReadOnlyCollection<Slot> slots, string from, string to);
    }

    public class ReservableSlotsProvider : IReservableSlotsProvider
    {
        public IReadOnlyCollection<Slot> GetReservableSlots(IReadOnlyCollection<Slot> slots, string from, string to)
        {
            return slots
                .Where(slot =>
                    slot.HasAvailabilityPeriodMatchingRequestedPeriod(DateOnly.Parse(from), DateOnly.Parse(to)) &&
                    slot.HasNoReservationsOverlappingWithRequestedPeriod(DateOnly.Parse(from), DateOnly.Parse(to))).ToList();
        }
    }
}
