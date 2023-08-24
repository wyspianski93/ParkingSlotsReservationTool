namespace EventBus
{
    public interface IEventManager
    {
        public Type GetEventTypeByName(string eventName);

        public Type GetEventHandlerTypeByEventName(string eventName);

        public void RegisterEvent(Type eventType, Type eventHandlerType);
    }
}
