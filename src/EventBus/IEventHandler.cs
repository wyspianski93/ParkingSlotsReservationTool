namespace EventBus
{
    public interface IEventHandler<in TEvent> where TEvent : IEvent
    {
        public Task Handle(TEvent @event);
    }
}
