﻿using EventBus;
using Slots.Service.Models;

namespace Slots.Service.Events
{
    public class ReservationCreatedEvent : EventBase
    {
        public ReservationCreatedEvent(Guid slotId, Guid reservationId, ReservationPeriod reservationPeriod) : base(Guid.NewGuid(), DateTime.Now)
        {
            SlotId = slotId;
            ReservationId = reservationId;
            ReservationPeriod = reservationPeriod;
        }

        public Guid SlotId { get; set; }

        public Guid ReservationId { get; set; }

        public ReservationPeriod ReservationPeriod { get; set; }
    }
}
