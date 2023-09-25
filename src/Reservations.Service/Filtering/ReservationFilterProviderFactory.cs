using Reservations.Service.Models;

namespace Reservations.Service.Filtering
{
    public interface IReservationFilterProviderFactory
    {
        IReservationFilterProvider GetProvider(string key);
    }

    public class ReservationFilterProviderFactory : IReservationFilterProviderFactory
    {
        public IReservationFilterProvider GetProvider(string key)
        {
            IReservationFilterProvider provider = key switch
            {
                ReservationModelKeys.ReservedById => new ReservedByIdFilterProvider(),
                ReservationModelKeys.SlotId => new SlotIdFilterProvider(),
                _ => throw new Exception($"Reservation filter '{key}' is not registered.")
            };

            return provider;
        }
    }
}
