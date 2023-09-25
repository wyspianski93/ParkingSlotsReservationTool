using Microsoft.AspNetCore.Mvc.Filters;
using Reservations.Service.Filtering;
using Reservations.Service.Models;
using Storage;

namespace Reservations.Service
{
    public interface IReservationsRepository
    {
        Task<IReadOnlyCollection<Reservation>> GetReservations(IReadOnlyCollection<IFilter> reservationFilters);

        Task AddReservationAsync(Reservation reservation);

        Task UpdateReservationStatusAsync(Guid reservationId, ReservationStatus reservationStatus);
    }

    public class ReservationsRepository : IReservationsRepository
    {
        private readonly IRepository _repository;
        private readonly IReservationFilterProviderFactory _reservationFilterProviderFactory;

        public ReservationsRepository(IRepository repository, IReservationFilterProviderFactory reservationFilterProviderFactory)
        {
            _repository = repository;
            _reservationFilterProviderFactory = reservationFilterProviderFactory;
        }

        public async Task<IReadOnlyCollection<Reservation>> GetReservations(IReadOnlyCollection<IFilter> reservationFilters)
        {
            var filters = reservationFilters
                .Select(reservationFilter => _reservationFilterProviderFactory
                    .GetProvider(reservationFilter.Key)
                    .GetFilter(reservationFilter.Value)).ToList();

            return await _repository.FindAllAsync(filters).ConfigureAwait(false);
        }

        public async Task AddReservationAsync(Reservation reservation)
        {
            await _repository.AddAsync(reservation);
        }

        public async Task UpdateReservationStatusAsync(Guid reservationId, ReservationStatus reservationStatus)
        {
            await _repository
                .UpdateOneAsync<Reservation, ReservationStatus>(
                reservation => reservation.Id == reservationId,
                reservation => reservation.Status,
                reservationStatus);
        }
    }
}
