using Reservations.Service.Models;
using Storage;

namespace Reservations.Service.Filtering
{
    public class SlotIdFilterProvider : IReservationFilterProvider
    {
        public Filter<Reservation> GetFilter(object filterValue)
            => new()
            {
                FieldSelector = reservation => reservation.SlotId,
                FieldValue = Guid.Parse(filterValue.ToString())
            };
        
    }
}
