using AuthenticationService.Endpoints;
using Microsoft.AspNetCore.Authorization;
using Storage;

namespace AuthenticationService
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

            services.AddScoped<IMongoDbConfig>(_ => _mongoDbConfig);
            services.AddScoped<IRepository, MongoRepository>();
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

                endpoint.MapGet("/hello-world", [Authorize]() => Results.Ok("Hello world!"));
            });
        }
    }
}
