namespace Reservations.Service.Filtering
{
    public interface IFilter
    {
        string Key { get; set; }

        object Value { get; set; }
    }

    public class Filter : IFilter
    {
        public string Key { get; set; }

        public object Value { get; set; }
    }
}
