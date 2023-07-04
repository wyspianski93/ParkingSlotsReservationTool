using Slots.Service.Models;
using Storage;

namespace Slots.Service
{
    public interface ISlotsRepository
    {
        Task AddSlotAsync(Slot slot);

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

        public async Task<bool> CheckSlotExistsAsync(string slotName)
        {
            var slot = await _repository.FindAsync<Slot>(x => x.Name == slotName).ConfigureAwait(false);

            return slot != null;
        }
    }
}
