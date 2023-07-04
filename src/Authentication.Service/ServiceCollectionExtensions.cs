using Authentication.Service.Identity;
using Storage;

namespace Authentication.Service
{
    public static class IdentityServiceCollectionExtensions
    {
        public static void AddMongoDbIdentity(this IServiceCollection services, MongoDbConfig mongoDbConfig)
        {
            services
                .AddIdentity<User, Role>()
                .AddMongoDbStores<User, Role, Guid>(mongoDbConfig.ConnectionString, mongoDbConfig.DatabaseName);
        }
    }
}
