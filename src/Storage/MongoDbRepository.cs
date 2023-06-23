using MongoDB.Driver;

namespace Storage
{
    public class MongoRepository : IRepository
    {
        private readonly MongoClient _client;
        private readonly IMongoDatabase _database;

        public MongoRepository(IMongoDbConfig mongoDbConfig)
        {
            _client = new MongoClient(mongoDbConfig.ConnectionString);
            _database = _client.GetDatabase(mongoDbConfig.DatabaseName);
        }
    }
}
