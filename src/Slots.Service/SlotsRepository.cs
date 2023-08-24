using Slots.Service.Models;
using Storage;

namespace Slots.Service
{
    public interface ISlotsRepository
    {
        Task AddSlotAsync(Slot slot);

        Task UpdateSlotReservationsAsync(Guid slotId, Reservation reservation);

        Task<bool> CheckSlotExistsAsync(string slotName);
    }

    public class SlotsRepository : ISlotsRepository
    {
        private readonly IRepository _repository;

        public SlotsRepository(IRepository repository)
        {
            _repository = repository;
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

        public async Task<bool> CheckSlotExistsAsync(string slotName)
        {
            var slot = await _repository.FindAsync<Slot>(x => x.Name == slotName).ConfigureAwait(false);

            return slot != null;
        }
    }
}
