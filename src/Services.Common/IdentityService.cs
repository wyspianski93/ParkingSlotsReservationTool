using Microsoft.AspNetCore.Http;
using Services.Common;

namespace Services.Common
{
    public interface IIdentityService
    {
        string? GetUserId();

        string? GetUserName();
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
            if (IsUserAuthenticated())
            {
                return _httpContextAccessor.HttpContext?.User.Claims.FirstOrDefault(claim => claim.Type == ClaimsConstants.UserId)?.Value;
            }

            return null;
        }

        public string? GetUserName()
        {
            if (IsUserAuthenticated())
            {
                return _httpContextAccessor.HttpContext?.User.Claims.FirstOrDefault(claim => claim.Type == ClaimsConstants.UserName)?.Value;
            }

            return null;
        }

        private bool IsUserAuthenticated() => _httpContextAccessor.HttpContext?.User.Identity?.IsAuthenticated ?? false;
    }
}
