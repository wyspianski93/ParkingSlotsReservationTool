namespace Reservations.Service.Dto
{
    public record ReservationDto(string SlotId, DateOnly From, DateOnly To);
}
