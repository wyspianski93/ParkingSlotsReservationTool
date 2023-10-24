using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Authentication.Service.Dto;
using Authentication.Service.Identity;
using Authentication.Service.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Services.Common;

namespace Authentication.Service.Endpoints
{
    public static class SignInEndpoint
    {
        public static void MapSignInEndpoint(this IEndpointRouteBuilder endpoint, JwtConfig jwtConfig)
        {
            endpoint.MapPost("/signin", async (UserSignInDto userSignIn, UserManager<User> userManager, IJwtUtils jwtUtils) =>
            {
                var user = await userManager.FindByEmailAsync(userSignIn.Email);

                if (user == null)
                {
                    return Results.BadRequest($"User {userSignIn.Email} does not exist.");
                }

                if (!await userManager.CheckPasswordAsync(user, userSignIn.Password))
                {
                    return Results.BadRequest("Password is incorrect.");
                }

                var roles = await userManager.GetRolesAsync(user);

                var claims = roles
                    .Select(role => new Claim(ClaimTypes.Role, role))
                    .Union(new List<Claim>() { new(ClaimsConstants.UserId, user.Id.ToString()), new(ClaimsConstants.UserName, user.UserName) }).ToList();

                var token = jwtUtils.CreateToken(claims);
                var refreshToken = jwtUtils.GenerateRandomToken();
                
                user.RefreshToken = refreshToken;
                user.RefreshTokenExpirationDate = DateTime.Now.AddHours(8);

                await userManager.UpdateAsync(user).ConfigureAwait(false);

                return Results.Ok(new Token() {  AccessToken = token, RefreshToken = refreshToken });
            });

            endpoint.MapPost("/refresh-token", async (UserManager<User> userManager, Token token, IJwtUtils jwtUtils) =>
            {
                var claimsPrincipal = jwtUtils.GetClaimsPrincipal(token.AccessToken, jwtConfig.Key);

                if (claimsPrincipal == null)
                {
                    return Results.BadRequest("Invalid access token or refresh token.");
                }

                var userId = claimsPrincipal.Claims.Single(x => x.Type == ClaimsConstants.UserId).Value;

                var user = await userManager.FindByIdAsync(userId).ConfigureAwait(false);

                if (user == null || user.RefreshToken != token.RefreshToken || user.RefreshTokenExpirationDate <= DateTime.Now)
                {
                    return Results.BadRequest("Invalid access token or refresh token");
                }

                var newAccessToken = jwtUtils.CreateToken(claimsPrincipal.Claims.ToList());
                var newRefreshToken = jwtUtils.GenerateRandomToken();

                user.RefreshToken = newRefreshToken;
                await userManager.UpdateAsync(user);

                return Results.Ok(new Token() { AccessToken = newAccessToken, RefreshToken = newRefreshToken });
            });
        }
    }
}