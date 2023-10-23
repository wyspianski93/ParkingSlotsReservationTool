namespace Reservations.Service.Dto
{
    public record ReservationDto(string SlotId, string SlotName, string SlotOwnerId, DateOnly From, DateOnly To);
}
