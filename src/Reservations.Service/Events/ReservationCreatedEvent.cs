using EventBus;
using Reservations.Service.Models;

namespace Reservations.Service.Events
{
    public class ReservationCreatedEvent : IEvent
    {
        public Guid SlotId { get; set; }

        public Guid ReservationId { get; set; }

        public ReservationPeriod ReservationPeriod { get; set; }
    }
}
