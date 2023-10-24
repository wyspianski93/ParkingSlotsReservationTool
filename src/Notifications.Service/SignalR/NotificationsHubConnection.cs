using Polly;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authorization;

namespace Notifications.Service.SignalR
{
    public interface INotificationsHubConnection
    {
        Task SendNotificationCreated(string receiverId);
    }

    public class NotificationsHubConnection : INotificationsHubConnection
    {
        private readonly IBaseHubConnection _hubConnection;

        public NotificationsHubConnection(IBaseHubConnection hubConnection)
        {
            _hubConnection = hubConnection;
        }

        public async Task SendNotificationCreated(string receiverId)
        {
            await _hubConnection.InvokeAsync("NotificationCreated", "Notification has been saved to database.", receiverId).ConfigureAwait(false);
        }
    }
}
