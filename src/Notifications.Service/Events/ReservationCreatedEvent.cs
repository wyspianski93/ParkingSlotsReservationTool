using EventBus;

namespace Notifications.Service.Events
{
    public class ReservationCreatedEvent : EventBase
    {
        public ReservationCreatedEvent(Guid slotId, string slotName, Guid slotOwnerId, Guid reservationId) : base(Guid.NewGuid(), DateTime.Now)
        {
            SlotId = slotId;
            SlotName = slotName;
            SlotOwnerId = slotOwnerId;
            ReservationId = reservationId;
        }

        public Guid SlotId { get; set; }

        public string SlotName { get; }

        public Guid SlotOwnerId { get; set; }

        public Guid ReservationId { get; set; }
    }
}
