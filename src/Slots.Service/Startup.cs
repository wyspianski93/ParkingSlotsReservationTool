﻿using Services.Common;
using Slots.Service.Endpoints;
using Slots.Service.EventsHandlers;
using Storage;
using Storage.Serializing;

namespace Slots.Service
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

            services.AddHttpContextAccessor();
            services.AddSingleton<IMongoDbConfig>(_ => _mongoDbConfig);
            services.AddSingleton<IBsonSerializersRegistrant, CommonSerializersRegistrant>();
            services.AddSingleton<IBsonSerializersRegistrantsRunner, BsonSerializersRegistrantsRunner>();

            services.AddSingleton<ISlotsRepository, SlotsRepository>();
            services.AddSingleton<IRepository, MongoRepository>();
            services.AddScoped<IIdentityService, IdentityService>();

            services.AddTransient<IReservableSlotsProvider, ReservableSlotsProvider>();

            services.AddTransient<ReservationCreatedEventHandler>();
            services.AddTransient<ReservationStatusUpdatedEventHandler>();
            services.AddRabbitMqEventBus("slots_service");
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
                    .AllowAnyMethod();
            });

            app.UseEndpoints(endpoint =>
            {
                endpoint.MapSlotsEndpoint();
            });
        }
    }
}
