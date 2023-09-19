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
            endpoint.MapPost("/signin", async (UserSignInDto userSignIn, UserManager<User> userManager) =>
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
                    .Union(new List<Claim>() { new(ClaimsConstants.UserId, user.Id.ToString()) }).ToList();

                var token = CreateToken(claims, jwtConfig);
                var refreshToken = GenerateRefreshToken();
                
                user.RefreshToken = refreshToken;
                user.RefreshTokenExpirationDate = DateTime.Now.AddHours(8);

                await userManager.UpdateAsync(user).ConfigureAwait(false);

                return Results.Ok(new Token() {  AccessToken = token, RefreshToken = refreshToken });
            });

            endpoint.MapPost("/refresh-token", async (UserManager<User> userManager, Token token) =>
            {
                var claimsPrincipal = GetClaimsPrincipal(token.AccessToken, jwtConfig.Key);

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

                var newAccessToken = CreateToken(claimsPrincipal.Claims.ToList(), jwtConfig);
                var newRefreshToken = GenerateRefreshToken();

                user.RefreshToken = newRefreshToken;
                await userManager.UpdateAsync(user);

                return Results.Ok(new Token() { AccessToken = newAccessToken, RefreshToken = newRefreshToken });
            });
        }

        private static string CreateToken(IReadOnlyCollection<Claim> claims, JwtConfig jwtConfig)
        {
            var signingCredentials =
                new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtConfig.Key)),
                    SecurityAlgorithms.HmacSha256);

            var tokenOptions = new JwtSecurityToken(
                issuer: jwtConfig.Issuer,
                audience: jwtConfig.Audience,
                expires: DateTime.Now.AddMinutes(15),
                claims: claims,
                signingCredentials: signingCredentials);

            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return token;
        }

        private static ClaimsPrincipal? GetClaimsPrincipal(string token, string key)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            
            var claimsPrincipal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
            
            if (securityToken is not JwtSecurityToken jwtSecurityToken ||
                !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256,
                    StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token");

            }

            return claimsPrincipal;

        }

        private static string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }
    }
}