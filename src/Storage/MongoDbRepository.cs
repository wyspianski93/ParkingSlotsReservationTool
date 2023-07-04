using System.Linq.Expressions;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using Storage.Serializing;

namespace Storage
{
    public class MongoRepository : IRepository
    {
        private readonly MongoClient _client;
        private readonly IMongoDatabase _database;

        public MongoRepository(IMongoDbConfig mongoDbConfig, IBsonSerializersRegistrantsRunner serializersRegistrantRunner)
        {
            _client = new MongoClient(mongoDbConfig.ConnectionString);
            _database = _client.GetDatabase(mongoDbConfig.DatabaseName);

            serializersRegistrantRunner.RunRegistrants();
        }

        public async Task AddAsync<TItem>(TItem item)
        {
            await Collection<TItem>().InsertOneAsync(item);
        }

        public async Task<TItem> FindAsync<TItem>(Expression<Func<TItem, bool>> itemFinder)
        {
            return await Collection<TItem>().AsQueryable().FirstOrDefaultAsync(itemFinder, CancellationToken.None).ConfigureAwait(false);
        }

        private IMongoCollection<TItem> Collection<TItem>()
        {
            return _database.GetCollection<TItem>(GetCollectionName<TItem>());
        }

        private string GetCollectionName<TItem>() => typeof(TItem).Name;
    }
}
