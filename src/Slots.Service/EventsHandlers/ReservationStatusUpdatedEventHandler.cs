using EventBus;
using Slots.Service.Events;

namespace Slots.Service.EventsHandlers
{
    public class ReservationStatusUpdatedEventHandler : IEventHandler<ReservationStatusUpdatedEvent>
    {
        private readonly ISlotsRepository _slotsRepository;

        public ReservationStatusUpdatedEventHandler(ISlotsRepository slotsRepository)
        {
            _slotsRepository = slotsRepository;
        }

        public async Task Handle(ReservationStatusUpdatedEvent @event)
        {
            await _slotsRepository.UpdateSlotReservationStatusAsync(@event.ReservationId, @event.Status).ConfigureAwait(false);
        }
    }
}
