using EventBus;
using Slots.Service.Models;

namespace Slots.Service.Events
{
    public class ReservationCreatedEvent : IEvent
    {
        public Guid SlotId { get; set; }

        public Guid ReservationId { get; set; }

        public ReservationPeriod ReservationPeriod { get; set; }
    }
}
