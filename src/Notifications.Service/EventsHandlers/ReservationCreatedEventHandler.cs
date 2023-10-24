using EventBus;
using Notifications.Service.Events;
using Microsoft.AspNetCore.SignalR.Client;
using Notifications.Service.SignalR;

namespace Notifications.Service.EventsHandlers
{
    public class ReservationCreatedEventHandler : IEventHandler<ReservationCreatedEvent>
    {
        private readonly INotificationsRepository _notificationsRepository;
        private readonly INotificationsHubConnection _notificationsHubConnection;

        public ReservationCreatedEventHandler(INotificationsRepository notificationsRepository, INotificationsHubConnection notificationsHubConnection)
        {
            _notificationsRepository = notificationsRepository;
            _notificationsHubConnection = notificationsHubConnection;
        }

        public async Task Handle(ReservationCreatedEvent @event)
        {
            try
            {
                await _notificationsRepository.AddNotificationAsync(new Notification()
                    {
                        Id = Guid.NewGuid(),
                        ReceiverId = @event.SlotOwnerId,
                        Content = $"A reservation has been created for slot {@event.SlotName}"
                    }).ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Saving a notification failed. {ex.Message}");
                return;
            }

            await _notificationsHubConnection.SendNotificationCreated().ConfigureAwait(false);
        }
    }
}
