namespace Slots.Service.Dto
{
    public record SlotDto(string Name, IReadOnlyCollection<AvailabilityPeriodDto> AvailabilityPeriods);
}
