using Slots.Service.Endpoints;
using Storage;

namespace Slots.Service.Models
{
    public class Slot
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public Guid OwnerId { get; set; }

        public string OwnerName { get; set; }

        public IReadOnlyCollection<AvailabilityPeriod> AvailabilityPeriods { get; set; } = new List<AvailabilityPeriod>();

        public IReadOnlyCollection<Reservation> Reservations { get; set; } = new List<Reservation>();
    }
}
