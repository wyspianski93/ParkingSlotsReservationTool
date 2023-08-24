namespace EventBus
{
    public class EventManager : IEventManager
    {
        private readonly Dictionary<string, EventMetadata> _eventsDictionary;

        public EventManager()
        {
            _eventsDictionary = new Dictionary<string, EventMetadata>();
        }

        public Type GetEventTypeByName(string eventName)
        {
            if (_eventsDictionary.ContainsKey(eventName))
            {
                return _eventsDictionary[eventName].EventType;
            }

            throw new Exception("Event not registered.");
        }

        public IReadOnlyCollection<Type> GetEventHandlersTypesByEventName(string eventName)
        {
            if (_eventsDictionary.ContainsKey(eventName))
            {
                return _eventsDictionary[eventName].EventHandlersTypes;
            }

            throw new Exception("Event not registered.");
        }

        public void RegisterEvent(Type eventType, Type eventHandlerType)
        {
            if (_eventsDictionary.TryGetValue(eventType.Name, out var eventMetadata))
            {
                eventMetadata.AddEventHandlerType(eventHandlerType);
            }
            else
            {
                _eventsDictionary.Add(eventType.Name, new EventMetadata(eventType, new List<Type>() { eventHandlerType }));
            }
        }
    }
}
