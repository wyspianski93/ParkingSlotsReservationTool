using Microsoft.AspNetCore.SignalR;

namespace Notifications.Service.SignalR
{
    public class NotificationsHub : Hub
    {
        public async Task NotificationCreated(string message)
        {
            await Clients.All.SendAsync("NotificationCreated", message);
        }
    }
}
