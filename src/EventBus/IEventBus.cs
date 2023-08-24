namespace EventBus
{
    public interface IEventBus
    {
        void Publish<TEvent>(TEvent @event);

        void Subscribe<TEvent, TEventHandler>() where TEventHandler : IEventHandler<TEvent> where TEvent : IEvent;
    }
}
