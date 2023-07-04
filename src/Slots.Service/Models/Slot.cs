using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Bson.Serialization;

namespace Slots.Service.Models
{
    public class Slot
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public Guid OwnerId { get; set; }

        public IReadOnlyCollection<AvailabilityPeriod> AvailabilityPeriods { get; set; }

        public IReadOnlyCollection<Reservation> Reservations { get; set; }
    }
}
