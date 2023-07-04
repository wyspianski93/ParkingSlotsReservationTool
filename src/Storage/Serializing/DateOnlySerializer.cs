using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;

namespace Storage.Serializing
{
    public class DateOnlySerializer : StructSerializerBase<DateOnly>
    {
        private readonly DateTimeSerializer _dateOnlySerializer = DateTimeSerializer.DateOnlyInstance;

        public override DateOnly Deserialize(
            BsonDeserializationContext context,
            BsonDeserializationArgs args) => DateOnly.FromDateTime(_dateOnlySerializer.Deserialize(context, args));

        public override void Serialize(
            BsonSerializationContext context,
            BsonSerializationArgs args,
            DateOnly value) => _dateOnlySerializer.Serialize(context, args, value.ToDateTime(TimeOnly.MinValue));
    }
}
