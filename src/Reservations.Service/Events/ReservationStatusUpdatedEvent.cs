using EventBus;
using Reservations.Service.Models;

namespace Reservations.Service.Events
{
    public class ReservationStatusUpdatedEvent : EventBase
    {
        public ReservationStatusUpdatedEvent(Guid reservationId, ReservationStatus status) : base(Guid.NewGuid(), DateTime.Now)
        {
            ReservationId = reservationId;
            Status = status;
        }

        public Guid ReservationId { get; set; }

        public ReservationStatus Status { get; set; }
    }
}
