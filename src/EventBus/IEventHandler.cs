namespace EventBus
{
    public interface IEventHandler<in TEvent> where TEvent : IEvent
    {
        public void Handle(TEvent @event);
    }
}
