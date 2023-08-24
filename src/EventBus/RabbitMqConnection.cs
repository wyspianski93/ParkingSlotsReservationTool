using RabbitMQ.Client;

namespace EventBus
{
    public class RabbitMqConnection : IRabbitMqConnection
    {
        private readonly IConnectionFactory _connectionFactory;
        
        private IConnection _connection;

        public bool IsConnected => _connection?.IsOpen ?? false;

        public RabbitMqConnection()
        {
            _connectionFactory = new ConnectionFactory
            {
                UserName = "guest",
                Password = "guest",
                VirtualHost = "/",
                HostName = "localhost",
                Port = 5672,
            };
        }

        public IModel CreateModel()
        {
            if (!IsConnected)
            {
                throw new Exception("There is no RabbitMQ connection.");
            }

            return _connection.CreateModel();
        }

        public void TryConnect()
        {
            _connection = _connectionFactory.CreateConnection();
        }

        public void Dispose()
        {
            _connection.Dispose();
        }
    }

}