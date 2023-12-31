﻿using System.Linq.Expressions;
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

        public async Task<IReadOnlyCollection<TItem>> GetAllAsync<TItem>()
        {
            return await Collection<TItem>().AsQueryable().ToListAsync().ConfigureAwait(false);
        }

        public async Task AddAsync<TItem>(TItem item)
        {
            await Collection<TItem>().InsertOneAsync(item);
        }

        public async Task<TItem> FindAsync<TItem>(Expression<Func<TItem, bool>> itemFinder)
        {
            return await Collection<TItem>().AsQueryable().FirstOrDefaultAsync(itemFinder, CancellationToken.None).ConfigureAwait(false);
        }

        public async Task<IReadOnlyCollection<TItem>> FindAllAsync<TItem>(IReadOnlyCollection<IFilter<TItem>> filters)
        {
            var filterDefinition = FilterDefinition(filters);

            return await (
                    await Collection<TItem>()
                        .FindAsync(filterDefinition)
                        .ConfigureAwait(false))
                .ToListAsync()
                .ConfigureAwait(false);
        }

        public async Task UpdateOneAsync<TItem, TField>(Expression<Func<TItem, bool>> itemFinder,
            Expression<Func<TItem, TField>> fieldSelector, TField fieldValue)
        {
            var updateDefinition = UpdateDefinition(fieldSelector, fieldValue);
            await Collection<TItem>().UpdateOneAsync(itemFinder, updateDefinition, null, CancellationToken.None);;
        }

        private IMongoCollection<TItem> Collection<TItem>()
        {
            return _database.GetCollection<TItem>(GetCollectionName<TItem>());
        }

        private string GetCollectionName<TItem>() => typeof(TItem).Name;

        private UpdateDefinition<TItem> UpdateDefinition<TItem, TField>(Expression<Func<TItem, TField>> fieldSelector, TField fieldValue)
        {
            return Builders<TItem>.Update
                .Set(fieldSelector, fieldValue);
        }

        private FilterDefinition<TItem> FilterDefinition<TItem>(IReadOnlyCollection<IFilter<TItem>> filters)
        {
            var builder = Builders<TItem>.Filter;
            var filterDefinition = builder.Empty;

            foreach (var filter in filters)
            {
                filterDefinition &= builder.Eq(filter.FieldSelector, filter.FieldValue);
            }

            return filterDefinition;
        }
    }
}
