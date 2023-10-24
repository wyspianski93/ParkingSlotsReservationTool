using Storage;

namespace Notifications.Service
{
    public interface INotificationsRepository
    {
        Task AddNotificationAsync(Notification notification);

        Task<IReadOnlyCollection<Notification>> GetNotificationsAsync();
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

        public async Task<IReadOnlyCollection<Notification>> GetNotificationsAsync()
        {
            return await _repository.GetAllAsync<Notification>().ConfigureAwait(false);
        }
    }

    public class Notification
    {
        public Guid Id { get; set; }

        public Guid ReceiverId { get; set; }

        public string Content { get; set; }
    }
}
