using EventBus;
using Microsoft.Extensions.DependencyInjection;

namespace Services.Common
{
    public static class EventBusExtensions
    {
        public static void AddRabbitMqEventBus(this IServiceCollection services, string serviceQueueName)
        {
            services.AddSingleton<IRabbitMqConnection, RabbitMqConnection>();
            services.AddSingleton<IEventManager, EventManager>();
            services.AddSingleton<IEventBus, RabbitMqEventBus>(sp =>
            {
                var rabbitMqConnection = sp.GetRequiredService<IRabbitMqConnection>();
                var eventManager = sp.GetRequiredService<IEventManager>();

                return new RabbitMqEventBus(rabbitMqConnection, serviceQueueName, sp, eventManager);
            });
        }
    }
}
