using Services.Common;

namespace Slots.Service
{
    public interface IIdentityService
    {
        string? GetUserId();
    }

    public class IdentityService : IIdentityService
    {
        private readonly HttpContext _httpContext;

        public IdentityService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContext = httpContextAccessor?.HttpContext ?? throw new ArgumentNullException($"Cannot obtain {nameof(HttpContext)}.");
        }

        public string? GetUserId()
        {
            if (_httpContext.User.Identity?.IsAuthenticated ?? false)
            {
                return _httpContext.User.Claims.FirstOrDefault(claim => claim.Type == ClaimsConstants.UserId)?.Value;
            }

            return null;
        }
    }
}
