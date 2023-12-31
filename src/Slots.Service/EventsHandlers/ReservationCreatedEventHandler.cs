﻿using EventBus;
using Slots.Service.Events;
using Slots.Service.Models;

namespace Slots.Service.EventsHandlers
{
    public class ReservationCreatedEventHandler : IEventHandler<ReservationCreatedEvent>
    {
        private readonly ISlotsRepository _slotsRepository;

        public ReservationCreatedEventHandler(ISlotsRepository slotsRepository)
        {
            _slotsRepository = slotsRepository;
        }

        public async Task Handle(ReservationCreatedEvent @event)
        {
            await _slotsRepository.UpdateSlotReservationsAsync(@event.SlotId, new Reservation()
            {
                Id = @event.ReservationId,
                ReservationPeriod = @event.ReservationPeriod
            }).ConfigureAwait(false);
        }
    }
}
