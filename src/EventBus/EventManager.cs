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

        public Type GetEventHandlerTypeByEventName(string eventName)
        {
            if (_eventsDictionary.ContainsKey(eventName))
            {
                return _eventsDictionary[eventName].EventHandlerType;
            }

            throw new Exception("Event not registered.");
        }

        public void RegisterEvent(Type eventType, Type eventHandlerType)
        {
            _eventsDictionary.Add(eventType.Name, new EventMetadata(eventType, eventHandlerType));
        }
    }
}
