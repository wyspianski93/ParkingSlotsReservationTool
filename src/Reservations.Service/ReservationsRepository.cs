using Reservations.Service.Models;
using Storage;

namespace Reservations.Service
{
    public interface IReservationsRepository
    {
        Task AddReservationAsync(Reservation reservation);

        Task UpdateReservationStatusAsync(Guid reservationId, ReservationStatus reservationStatus);
    }

    public class ReservationsRepository : IReservationsRepository
    {
        private readonly IRepository _repository;

        public ReservationsRepository(IRepository repository)
        {
            _repository = repository;
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
