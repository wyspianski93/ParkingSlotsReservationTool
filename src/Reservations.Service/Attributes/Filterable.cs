namespace Reservations.Service.Attributes
{
    [AttributeUsage(AttributeTargets.Property)]
    public class Filterable : Attribute
    {
        public string Key { get; }

        public Filterable(string key)
        {
            Key = key;
        }
    }
}