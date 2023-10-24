using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Services.Common;

namespace Notifications.Service.SignalR
{
    [Authorize]
    public class NotificationsHub : Hub
    {
        private readonly IHttpContextAccessor _contextAccessor;
        
        public NotificationsHub(IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
        }

        public async Task NotificationCreated(string message, string receiverId)
        {
            await Clients.Group(receiverId).SendAsync("NotificationCreated", message);
        }

        public override Task OnConnectedAsync()
        {
            var userId = _contextAccessor?.HttpContext?.User.Claims
                .SingleOrDefault(x => x.Type == ClaimsConstants.UserId)
                ?.Value;

            if (!string.IsNullOrEmpty(userId))
            {
                Groups.AddToGroupAsync(Context.ConnectionId, userId);
            }

            return base.OnConnectedAsync();
        }
    }
}
