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
            endpoint.MapPost(
                "/reservations/create",
                [Authorize]
                async (ReservationDto reservationDto, IReservationsRepository reservationsRepository, IIdentityService identityService, IEventBus eventBus) =>
                {
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

                    eventBus.Publish(new ReservationCreatedEvent()
                    {
                        SlotId = newReservation.SlotId,
                        ReservationId = newReservation.Id,
                        ReservationPeriod = newReservation.Period
                    });

                    return Results.Ok($"Reservation created. Waiting for slot's owner confirmation.");
                });

            endpoint.MapPost(
                "/reservation/accept",
                [Authorize]
                async(ReservationIdDto reservationIdDto, IReservationsRepository reservationsRepository, IEventBus eventBus) =>
                {
                    await reservationsRepository
                        .UpdateReservationStatusAsync(reservationIdDto.ReservationId, ReservationStatus.Confirmed).ConfigureAwait(false);

                    eventBus.Publish(new ReservationStatusUpdatedEvent()
                    {
                        ReservationId = reservationIdDto.ReservationId,
                        Status = ReservationStatus.Confirmed
                    });
                });

            endpoint.MapPost(
                "/reservation/cancel",
                [Authorize]
                async (ReservationIdDto reservationIdDto, IReservationsRepository reservationsRepository, IEventBus eventBus) =>
                {
                    await reservationsRepository
                        .UpdateReservationStatusAsync(reservationIdDto.ReservationId, ReservationStatus.Canceled).ConfigureAwait(false);

                    eventBus.Publish(new ReservationStatusUpdatedEvent()
                    {
                        ReservationId = reservationIdDto.ReservationId,
                        Status = ReservationStatus.Canceled
                    });
                });
        }
    }
}
