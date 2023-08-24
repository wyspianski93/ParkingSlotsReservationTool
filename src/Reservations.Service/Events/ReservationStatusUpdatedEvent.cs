using EventBus;
using Reservations.Service.Models;

namespace Reservations.Service.Events
{
    public class ReservationStatusUpdatedEvent : IEvent
    {
        public Guid ReservationId { get; set; }

        public ReservationStatus Status { get; set; }
    }
}
