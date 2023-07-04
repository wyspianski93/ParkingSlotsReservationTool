using Microsoft.AspNetCore.Authorization;
using Slots.Service.Dto;
using Slots.Service.Models;

namespace Slots.Service.Endpoints
{
    public static class SlotsEndpoint
    {
        public static void MapSlotsEndpoint(this IEndpointRouteBuilder endpoint)
        {
            endpoint.MapPost(
                "/slots/create",
                [Authorize]
                async (SlotDto slotDto, ISlotsRepository slotsRepository, IIdentityService identityService) =>
                {
                    var userId = identityService.GetUserId();

                    var slotWithNameExists = await slotsRepository.CheckSlotExistsAsync(slotDto.Name);
                    
                    if (slotWithNameExists)
                    {
                        return Results.BadRequest($"Slot {slotDto.Name} already exists.");
                    }

                    var newSlot = new Slot()
                    {
                        Id = Guid.NewGuid(),
                        OwnerId = Guid.Parse(userId ?? string.Empty),
                        Name = slotDto.Name,
                        AvailabilityPeriods = slotDto
                            .AvailabilityPeriods
                            .Select(availabilityPeriodDto => new AvailabilityPeriod()
                                { From = availabilityPeriodDto.From, To = availabilityPeriodDto.To })
                            .ToList()
                    };

                    await slotsRepository.AddSlotAsync(newSlot);
                    
                    return Results.Ok($"Slot '{newSlot.Name}' added.");
                });
        }
    }
}