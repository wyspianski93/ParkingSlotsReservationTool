using Slots.Service.Endpoints;
using Slots.Service.Models;
using Storage;

namespace Slots.Service
{
    public interface ISlotsRepository
    {
        Task<IReadOnlyCollection<Slot>> GetSlotsAsync();

        Task<IReadOnlyCollection<Slot>> GetReservableSlotsAsync(string from, string to);

        Task<Slot> GetSlotAsync(string slotId);

        Task AddSlotAsync(Slot slot);

        Task UpdateSlotReservationsAsync(Guid slotId, Reservation reservation);

        Task UpdateSlotReservationStatusAsync(Guid reservationId, ReservationStatus reservationStatus);

        Task<bool> CheckSlotExistsAsync(string slotName);
    }

    public class SlotsRepository : ISlotsRepository
    {
        private readonly IRepository _repository;
        private readonly IReservableSlotsProvider _reservableSlotsProvider;

        public SlotsRepository(IRepository repository, IReservableSlotsProvider reservableSlotsProvider)
        {
            _repository = repository;
            _reservableSlotsProvider = reservableSlotsProvider;
        }

        public async Task<IReadOnlyCollection<Slot>> GetSlotsAsync()
        {
            return await _repository.GetAllAsync<Slot>().ConfigureAwait(false);
        }
        
        //TODO: perform filtering on repository side?
        public async Task<IReadOnlyCollection<Slot>> GetReservableSlotsAsync(string from, string to)
        {
            var slots = await _repository.GetAllAsync<Slot>().ConfigureAwait(false);

            var reservableSlots = _reservableSlotsProvider.GetReservableSlots(slots, from, to);

            return reservableSlots.ToList();
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
