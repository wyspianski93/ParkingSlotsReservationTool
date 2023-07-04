using Authentication.Service.Endpoints;
using Microsoft.AspNetCore.Authorization;
using Services.Common;
using Storage;
using Storage.Serializing;

namespace Authentication.Service
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

            services.AddMongoDbIdentity(_mongoDbConfig);

            services.AddJwtAuthentication(_jwtConfig);
            services.AddAuthorization();

            services.AddSingleton<IMongoDbConfig>(_ => _mongoDbConfig);
            services.AddSingleton<IRepository, MongoRepository>();
            services.AddSingleton<IBsonSerializersRegistrant, CommonSerializersRegistrant>();
            services.AddSingleton<IBsonSerializersRegistrantsRunner, BsonSerializersRegistrantsRunner>();
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

            app.UseEndpoints(endpoint =>
            {
                endpoint.MapRolesEndpoint();
                endpoint.MapUsersEndpoint();
                endpoint.MapLoginEndpoint(_jwtConfig);

                endpoint.MapGet("/hello-world", [Authorize] (HttpContext
                context) => Results.Ok("Hello world!"));
            });
        }
    }
}
