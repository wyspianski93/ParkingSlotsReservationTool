using System.ComponentModel;
using Reservations.Service.Attributes;

namespace Reservations.Service.Models
{
    public static class ReservationModelKeys
    {
        public const string SlotId = "slotId";
        public const string ReservedById = "reservedById";
    }

    public class Reservation
    {
        public Guid Id { get; set; }

        [Filterable(ReservationModelKeys.SlotId)]
        public Guid SlotId { get; set; }

        [Filterable(ReservationModelKeys.ReservedById)]
        public Guid ReservedById { get; set; }

        public ReservationPeriod Period { get; set; }

        public ReservationStatus Status { get; set; }
    }

  
}
