using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text.Json;

namespace EventBus
{
    public class RabbitMqEventBus : IEventBus
    {
        private const string ExchangeName = "parking_slots_reservation_event_bus";

        private readonly IRabbitMqConnection _rabbitMqConnection;
        private readonly string _queueName;
        private readonly IServiceProvider _serviceProvider;
        private readonly IEventManager _eventManager;
        private readonly IModel _consumerChannel;


        public RabbitMqEventBus(IRabbitMqConnection rabbitMqConnection, string queueName, IServiceProvider serviceProvider, IEventManager eventManager)
        {
            _rabbitMqConnection = rabbitMqConnection;
            _queueName = queueName;
            _serviceProvider = serviceProvider;
            _eventManager = eventManager;

            _consumerChannel = CreateConsumerChannel();
        }

        private IModel CreateConsumerChannel()
        {
            if (!_rabbitMqConnection.IsConnected)
            {
                _rabbitMqConnection.TryConnect();
            }

            var channel = _rabbitMqConnection.CreateModel();

            channel.ExchangeDeclare(exchange: ExchangeName, type: ExchangeType.Direct);

            channel.QueueDeclare(_queueName, durable: true);

            return channel;
        }

        public void Publish<TEvent>(TEvent @event)
        {
            if (!_rabbitMqConnection.IsConnected)
            {
                _rabbitMqConnection.TryConnect();
            }

            using var publisherChannel = _rabbitMqConnection.CreateModel();

            publisherChannel.ExchangeDeclare(ExchangeName, type: ExchangeType.Direct);

            publisherChannel.BasicPublish(exchange: ExchangeName,
                routingKey:  typeof(TEvent).Name,
                basicProperties: publisherChannel.CreateBasicProperties(),
                body: JsonSerializer.SerializeToUtf8Bytes(@event));
        }

        public void Subscribe<TEvent, TEventHandler>() where TEventHandler: IEventHandler<TEvent> where TEvent : IEvent
        {
            _consumerChannel.QueueBind(_queueName, ExchangeName, typeof(TEvent).Name);

            var consumer = new EventingBasicConsumer(_consumerChannel);

            _eventManager.RegisterEvent(typeof(TEvent), typeof(TEventHandler));

            consumer.Received += ConsumerOnReceived;

            _consumerChannel.BasicConsume(queue: _queueName,
                autoAck: true,
                consumer: consumer);
        }

        private void ConsumerOnReceived(object? sender, BasicDeliverEventArgs ea)
        {
            var eventName = ea.RoutingKey;
            var eventType = _eventManager.GetEventTypeByName(eventName);

            var eventHandlersTypes = _eventManager.GetEventHandlersTypesByEventName(eventName);

            foreach (var eventHandlerType in eventHandlersTypes)
            {
                var eventHandlerObj = _serviceProvider.GetService(eventHandlerType);
                var eventHandlerConcreteType = typeof(IEventHandler<>).MakeGenericType(eventType);

                var eventObj = JsonSerializer.Deserialize(ea.Body.Span, eventType);

                eventHandlerConcreteType
                    .GetMethod("Handle")?.Invoke(eventHandlerObj, new[] { eventObj as object });
            }
        }
    }
}