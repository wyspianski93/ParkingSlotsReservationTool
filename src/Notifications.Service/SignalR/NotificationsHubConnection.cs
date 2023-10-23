namespace Notifications.Service.SignalR
{
    public interface INotificationsHubConnection
    {
        Task SendNotificationCreated();
    }
  
    public class NotificationsHubConnection : INotificationsHubConnection
    {
        private readonly IBaseHubConnection _hubConnection;

        public NotificationsHubConnection(IBaseHubConnection hubConnection)
        {
            _hubConnection = hubConnection;
        }

        public async Task SendNotificationCreated()
        {
            await _hubConnection.InvokeAsync("NotificationCreated", "Notification has been saved to database.").ConfigureAwait(false);
        }
    }
}
