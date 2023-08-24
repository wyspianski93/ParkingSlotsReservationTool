using RabbitMQ.Client;

namespace EventBus
{
    public interface IRabbitMqConnection : IDisposable
    {
        IModel CreateModel();

        bool IsConnected { get; }

        void TryConnect();
    }
}
