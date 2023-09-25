using Reservations.Service.Models;
using Storage;

namespace Reservations.Service.Filtering
{
    public interface IReservationFilterProvider
    {
        Filter<Reservation> GetFilter(object filterValue);
    }
}
