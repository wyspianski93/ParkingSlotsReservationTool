using Storage;

namespace Notifications.Service
{
    public interface INotificationsRepository
    {
        Task AddNotificationAsync(Notification notification);
    }

    public class NotificationsRepository : INotificationsRepository
    {
        private readonly IRepository _repository;

        public NotificationsRepository(IRepository repository)
        {
            _repository = repository;
        }

        public async Task AddNotificationAsync(Notification notification)
        {
            await _repository.AddAsync(notification).ConfigureAwait(false);
        }
    }

    public class Notification
    {
        public Guid ReceiverId { get; set; }

        public string Content { get; set; }
    }
}
