using System.Diagnostics;
using System.Reflection;
using Microsoft.AspNetCore.Authorization;
using Services.Common;
using Slots.Service.Dto;
using Slots.Service.Models;

namespace Slots.Service.Endpoints
{
    public static class SlotsEndpoint
    {
        public static void MapSlotsEndpoint(this IEndpointRouteBuilder endpoint)
        {
            endpoint.MapGet(
                "/slots", [Authorize] async (ISlotsRepository slotsRepository) =>
                {
                    var slots = await slotsRepository.GetSlotsAsync().ConfigureAwait(false);

                    return Results.Ok(slots);
                });

            endpoint.MapGet(
                "/slots/reservable", [Authorize] async(string from, string to, ISlotsRepository slotsRepository) =>
                {
                    var slots = await slotsRepository.GetReservableSlotsAsync(from, to).ConfigureAwait(false);
   
                    return Results.Ok(slots);
                });

            endpoint.MapGet(
                "/slots/{id}", [Authorize] async (ISlotsRepository slotsRepository, string id) =>
                {
                    var slot = await slotsRepository.GetSlotAsync(id).ConfigureAwait(false);

                    return Results.Ok(slot);
                });

            endpoint.MapPost(
                "/slots/create",
                [Authorize]
                async (SlotDto slotDto, ISlotsRepository slotsRepository, IIdentityService identityService) =>
                {
                    var userId = identityService.GetUserId();
                    var userName = identityService.GetUserName();

                    var slotWithNameExists = await slotsRepository.CheckSlotExistsAsync(slotDto.Name).ConfigureAwait(false);
                    
                    if (slotWithNameExists)
                    {
                        return Results.BadRequest($"Slot {slotDto.Name} already exists.");
                    }

                    var newSlot = new Slot()
                    {
                        Id = Guid.NewGuid(),
                        OwnerId = Guid.Parse(userId ?? string.Empty),
                        OwnerName = userName ?? string.Empty,
                        Name = slotDto.Name,
                        AvailabilityPeriods = slotDto
                            .AvailabilityPeriods
                            .Select(availabilityPeriodDto => new AvailabilityPeriod()
                                { From = availabilityPeriodDto.From, To = availabilityPeriodDto.To })
                            .ToList()
                    };

                    await slotsRepository.AddSlotAsync(newSlot).ConfigureAwait(false);
                    
                    return Results.Ok($"Slot '{newSlot.Name}' added.");
                });
        }
    }
}