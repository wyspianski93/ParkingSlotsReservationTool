namespace EventBus
{
    public interface IEventManager
    {
        public Type GetEventTypeByName(string eventName);

        public IReadOnlyCollection<Type> GetEventHandlersTypesByEventName(string eventName);

        public void RegisterEvent(Type eventType, Type eventHandlerType);
    }
}
