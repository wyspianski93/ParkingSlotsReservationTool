namespace Reservations.Service.Models
{
    public class Reservation
    {
        public Guid Id { get; set; }

        public Guid SlotId { get; set; }

        public Guid ReservedById { get; set; }

        public ReservationPeriod Period { get; set; }

        public ReservationStatus Status { get; set; }
    }
}
