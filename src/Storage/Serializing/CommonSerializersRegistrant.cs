using MongoDB.Bson.Serialization;

namespace Storage.Serializing
{
    public class CommonSerializersRegistrant : IBsonSerializersRegistrant
    {
        public void Register()
        {
            BsonSerializer.RegisterSerializer(new DateOnlySerializer());
        }
    }
}
