namespace EventBus
{
    public abstract class EventBase : IEvent
    {
        protected EventBase(Guid eventId, DateTime timestamp)
        {
            EventId = eventId;
            Timestamp = timestamp;
        }

        public Guid EventId { get; set; }

        public DateTime Timestamp { get; set; }
    }
}
