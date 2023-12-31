﻿using EventBus;
using Reservations.Service.Models;

namespace Reservations.Service.Events
{
    public class ReservationCreatedEvent : EventBase
    {
        public ReservationCreatedEvent(Guid slotId, string slotName, Guid slotOwnerId, Guid reservationId, ReservationPeriod reservationPeriod) 
            : base(Guid.NewGuid(), DateTime.Now)
        {
            SlotId = slotId;
            SlotName = slotName;
            SlotOwnerId = slotOwnerId;
            ReservationId = reservationId;
            ReservationPeriod = reservationPeriod;
        }

        public Guid SlotId { get; set; }

        public string SlotName { get; }

        public Guid SlotOwnerId { get; set; }

        public Guid ReservationId { get; set; }

        public ReservationPeriod ReservationPeriod { get; set; }
    }
}
