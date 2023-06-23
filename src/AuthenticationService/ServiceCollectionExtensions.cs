using System.Text;
using AuthenticationService.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Storage;

namespace AuthenticationService
{
    public static class IdentityServiceCollectionExtensions
    {
        public static void AddMongoDbIdentity(this IServiceCollection services, MongoDbConfig mongoDbConfig)
        {
            services
                .AddIdentity<User, Role>()
                .AddMongoDbStores<User, Role, Guid>(mongoDbConfig.ConnectionString, mongoDbConfig.DatabaseName);
        }

        public static void AddJwtAuthentication(this IServiceCollection services, JwtConfig jwtConfig)
        {
            services.AddAuthentication(options => {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidAudience = jwtConfig.Audience,
                    ValidIssuer = jwtConfig.Issuer,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfig.Key)),
                    ValidateIssuerSigningKey = true,
                    RequireExpirationTime = false
                };
            });

        }
    }
}
