using Slots.Service.Models;
using Storage;

namespace Slots.Service
{
    public interface ISlotsRepository
    {
        Task<IReadOnlyCollection<Slot>> GetSlotsAsync();

        Task<Slot> GetSlotAsync(string slotId);

        Task AddSlotAsync(Slot slot);

        Task UpdateSlotReservationsAsync(Guid slotId, Reservation reservation);

        Task UpdateSlotReservationStatusAsync(Guid reservationId, ReservationStatus reservationStatus);

        Task<bool> CheckSlotExistsAsync(string slotName);
    }

    public class SlotsRepository : ISlotsRepository
    {
        private readonly IRepository _repository;

        public SlotsRepository(IRepository repository)
        {
            _repository = repository;
        }

        public async Task<IReadOnlyCollection<Slot>> GetSlotsAsync()
        {
            return await _repository.GetAllAsync<Slot>().ConfigureAwait(false);
        }

        public async Task<Slot> GetSlotAsync(string slotId)
        {
            return await _repository.FindAsync<Slot>(x => x.Id == Guid.Parse(slotId)).ConfigureAwait(false);
        }

        public async Task AddSlotAsync(Slot slot)
        {
           await _repository.AddAsync(slot);
        }

        public async Task UpdateSlotReservationsAsync(Guid slotId, Reservation reservation)
        {
            var slot = await _repository.FindAsync<Slot>(x => x.Id == slotId).ConfigureAwait(false);

            var currentReservations = slot.Reservations?.ToList() ?? new List<Reservation>();
            currentReservations.Add(reservation);

            await _repository.UpdateOneAsync<Slot, IReadOnlyCollection<Reservation>>(x => x.Id == slotId, x => x.Reservations, currentReservations);
        }

        public async Task UpdateSlotReservationStatusAsync(Guid reservationId, ReservationStatus reservationStatus)
        {
            var slot = await _repository
                .FindAsync<Slot>(x => x.Reservations.Any(r => r.Id == reservationId))
                .ConfigureAwait(false);

            var currentReservation = slot.Reservations?.Single(r => r.Id == reservationId) ?? throw new Exception($"No reservation '{reservationId}' for slot '{slot.Id}'.");
            
            currentReservation.ReservationStatus = reservationStatus;

            await _repository.UpdateOneAsync<Slot, IReadOnlyCollection<Reservation>>(x => x.Id == slot.Id, x => x.Reservations, slot.Reservations);
        }

        public async Task<bool> CheckSlotExistsAsync(string slotName)
        {
            var slot = await _repository.FindAsync<Slot>(x => x.Name == slotName).ConfigureAwait(false);

            return slot != null;
        }
    }
}
