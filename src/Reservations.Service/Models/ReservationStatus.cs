using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Reservations.Service.Models
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum ReservationStatus
    {
        Pending = 0,
        Confirmed = 1,
        Canceled = 2
    }
}
