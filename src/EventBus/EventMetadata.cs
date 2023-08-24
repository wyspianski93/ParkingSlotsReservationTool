namespace EventBus
{
    public class EventMetadata
    {
        public EventMetadata(Type eventType, IReadOnlyCollection<Type> eventHandlersTypes)
        {
            EventType = eventType;
            EventHandlersTypes = eventHandlersTypes;
        }

        public Type EventType { get; }

        public IReadOnlyCollection<Type> EventHandlersTypes { get; private set; }

        public void AddEventHandlerType(Type eventHandlerType)
        {
            var newEventHandlersTypes = new List<Type>() { eventHandlerType };
            newEventHandlersTypes.AddRange(EventHandlersTypes);

            EventHandlersTypes = newEventHandlersTypes;
        }
    }
}
