using Reservations.Service.Models;
using Storage;

namespace Reservations.Service.Filtering
{
    public class ReservedByIdFilterProvider : IReservationFilterProvider
    {
        public Filter<Reservation> GetFilter(object filterValue)
            => new()
            {
                FieldSelector = reservation => reservation.ReservedById,
                FieldValue = Guid.Parse(filterValue.ToString())
            };
    }
}
