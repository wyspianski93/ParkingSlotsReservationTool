using EventBus;
using Slots.Service.Models;

namespace Slots.Service.Events
{
    public class ReservationStatusUpdatedEvent : IEvent
    {
        public Guid ReservationId { get; set; }

        public ReservationStatus Status { get; set; }
    }
}
