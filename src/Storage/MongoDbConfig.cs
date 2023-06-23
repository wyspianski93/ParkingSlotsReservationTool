namespace Storage
{
    public interface IMongoDbConfig
    {
        string ConnectionString { get;}
        
        string DatabaseName { get; }
    }

    public class MongoDbConfig : IMongoDbConfig
    {
        public string ConnectionString { get; init; } = string.Empty;

        public string DatabaseName { get; init; } = string.Empty;
    }
}
