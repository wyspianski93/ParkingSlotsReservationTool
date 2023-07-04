namespace Storage.Serializing
{
    public interface IBsonSerializersRegistrantsRunner
    {
        public void RunRegistrants();
    }

    public class BsonSerializersRegistrantsRunner : IBsonSerializersRegistrantsRunner
    {
        private readonly IEnumerable<IBsonSerializersRegistrant> _bsonSerializerRegistrants;

        public BsonSerializersRegistrantsRunner(IEnumerable<IBsonSerializersRegistrant> bsonSerializerRegistrants)
        {
            _bsonSerializerRegistrants = bsonSerializerRegistrants;
        }

        public void RunRegistrants()
        {
            foreach (var registrant in _bsonSerializerRegistrants)
            {
                registrant.Register();
            }
        }
    }
}
