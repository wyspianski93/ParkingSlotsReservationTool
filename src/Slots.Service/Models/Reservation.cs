namespace Slots.Service.Models
{
    //TODO: add creation timestamp
    public class Reservation
    {
        public Guid Id { get; set; }

        public ReservationPeriod ReservationPeriod { get; set; }

        public ReservationStatus ReservationStatus { get; set; }
    }
}
