namespace Slots.Service.Models
{
    public class Reservation
    {
        public Guid Id { get; set; }

        public ReservationPeriod ReservationPeriod { get; set; }

        public ReservationStatus ReservationStatus { get; set; }
    }
}
