using Microsoft.AspNetCore.Http;
using Services.Common;

namespace Services.Common
{
    public interface IIdentityService
    {
        string? GetUserId();
    }

    public class IdentityService : IIdentityService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IdentityService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string? GetUserId()
        {
            if (_httpContextAccessor.HttpContext?.User.Identity?.IsAuthenticated ?? false)
            {
                return _httpContextAccessor.HttpContext?.User.Claims.FirstOrDefault(claim => claim.Type == ClaimsConstants.UserId)?.Value;
            }

            return null;
        }
    }
}
