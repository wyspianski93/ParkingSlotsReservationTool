using Slots.Service.Endpoints;

namespace Slots.Service.Models
{
    public class AvailabilityPeriod
    {
        //[Filterable("from")]
        public DateOnly From { get; set; }

        public DateOnly To { get; set; }
    }
}
