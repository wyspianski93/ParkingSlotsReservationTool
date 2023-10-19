using EventBus;
using Microsoft.AspNetCore.Authorization;
using Reservations.Service.Dto;
using Reservations.Service.Events;
using Reservations.Service.Models;
using Services.Common;

namespace Reservations.Service.Endpoints
{
    public static class ReservationsEndpoint
    {
        public static void MapReservationsEndpoint(this IEndpointRouteBuilder endpoint)
        {
            endpoint.MapGet("/reservations",
                [Authorize] async (HttpContextBindedReservationFilter reservationFilters, IIdentityService identityService, IReservationsRepository reservationsRepository) =>
                {
                    return await reservationsRepository.GetReservations(reservationFilters.Filters).ConfigureAwait(false);
                });

            endpoint.MapPost(
                "/reservations/create",
                [Authorize]
                async (ReservationDto reservationDto, IReservationsRepository reservationsRepository, IIdentityService identityService, IEventBus eventBus) =>
                {
                    //TODO: add check if already reserved
                    var userId = identityService.GetUserId();

                    var newReservation = new Reservation()
                    {
                        Id = Guid.NewGuid(),
                        ReservedById = Guid.Parse(userId ?? string.Empty),
                        SlotId = Guid.Parse(reservationDto.SlotId),
                        Status = ReservationStatus.Pending,
                        Period = new ReservationPeriod()
                        {
                            From = reservationDto.From,
                            To = reservationDto.To
                        }
                    };

                    await reservationsRepository.AddReservationAsync(newReservation);

                    eventBus.Publish(
                        new ReservationCreatedEvent(newReservation.SlotId, newReservation.Id, newReservation.Period));

                    return Results.Ok($"Reservation created. Waiting for slot's owner confirmation.");
                });

            endpoint.MapPost(
                "/reservations/{reservationId}/accept",
                [Authorize]
                async(string reservationId, IReservationsRepository reservationsRepository, IEventBus eventBus) =>
                {
                    await reservationsRepository
                        .UpdateReservationStatusAsync(Guid.Parse(reservationId), ReservationStatus.Confirmed).ConfigureAwait(false);

                    eventBus.Publish(
                        new ReservationStatusUpdatedEvent(Guid.Parse(reservationId), ReservationStatus.Confirmed));

                    return Results.Ok($"Reservation '{reservationId}' accepted.");
                });

            endpoint.MapPost(
                "/reservations/{reservationId}/cancel",
                [Authorize]
                async (string reservationId, IReservationsRepository reservationsRepository, IEventBus eventBus) =>
                {
                    await reservationsRepository
                        .UpdateReservationStatusAsync(Guid.Parse(reservationId), ReservationStatus.Canceled).ConfigureAwait(false);

                    eventBus.Publish(
                        new ReservationStatusUpdatedEvent(Guid.Parse(reservationId), ReservationStatus.Canceled));

                    return Results.Ok($"Reservation '{reservationId}' canceled.");
                });
        }
    }
}
