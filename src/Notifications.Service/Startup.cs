using Notifications.Service.EventsHandlers;
using Services.Common;
using Storage;
using Storage.Serializing;
using Microsoft.AspNetCore.SignalR;
using Notifications.Service.SignalR;
using Microsoft.AspNetCore.Authorization;

namespace Notifications.Service
{
    public class Startup
    {
        private readonly MongoDbConfig _mongoDbConfig;
        private readonly JwtConfig _jwtConfig;

        public Startup(IConfiguration config)
        {
            _mongoDbConfig = config.GetSection(nameof(MongoDbConfig)).Get<MongoDbConfig>() ?? throw new Exception($"{nameof(MongoDbConfig)} is not provided.");
            _jwtConfig = config.GetSection(nameof(JwtConfig)).Get<JwtConfig>() ?? throw new Exception($"{nameof(JwtConfig)} is not provided.");
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            services.AddJwtAuthentication(_jwtConfig);
            services.AddAuthorization();

            services.AddCors();

            services.AddSignalR();
    
            services.AddHttpContextAccessor();
            services.AddSingleton<IMongoDbConfig>(_ => _mongoDbConfig);
            services.AddSingleton<IBsonSerializersRegistrant, CommonSerializersRegistrant>();
            services.AddSingleton<IBsonSerializersRegistrantsRunner, BsonSerializersRegistrantsRunner>();

            services.AddSingleton<IRepository, MongoRepository>();
            services.AddSingleton<INotificationsRepository, NotificationsRepository>();
            services.AddScoped<IIdentityService, IdentityService>();

            services.AddSingleton<INotificationsHubConnection, NotificationsHubConnection>(_ =>
                new NotificationsHubConnection(new BaseHubConnection("http://localhost:5154/hubs/notifications"))
            );

            services.AddTransient<ReservationCreatedEventHandler>();
            services.AddRabbitMqEventBus("notifications_service");
        }

        public void Configure(IApplicationBuilder app,
            IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseHttpsRedirection();

            app.UseCors(builder =>
            {
                builder
                    .WithOrigins("http://localhost:3000")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });

            app.UseEndpoints(endpoint =>
            {
                endpoint.MapHub<NotificationsHub>("/hubs/notifications");

                endpoint.MapGet( "/notifications",  async (INotificationsRepository notificationsRepository)
                    => await notificationsRepository.GetNotificationsAsync().ConfigureAwait(false));
            });
        }
    }
}
