using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AuthenticationService.Dto;
using AuthenticationService.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace AuthenticationService.Endpoints
{
    public static class LoginEndpoint
    {
        public static void MapLoginEndpoint(this IEndpointRouteBuilder endpoint, JwtConfig jwtConfig)
        {
            endpoint.MapPost("/login", async (UserDto userDto, UserManager<User> userManager) =>
            {
                var user = await userManager.FindByEmailAsync(userDto.Email);

                if (user == null)
                {
                    return Results.BadRequest($"User {userDto.Email} does not exist.");
                }

                if (!await userManager.CheckPasswordAsync(user, userDto.Password))
                {
                    return Results.BadRequest("Password is incorrect.");
                }

                var signingCredentials =
                    new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtConfig.Key)),
                        SecurityAlgorithms.HmacSha256);

                var roles = await userManager.GetRolesAsync(user);

                var claims = roles.Select(role => new Claim(ClaimTypes.Role, role));

                var tokenOptions = new JwtSecurityToken(
                    issuer: jwtConfig.Issuer,
                    audience: jwtConfig.Audience,
                    claims: claims,
                    signingCredentials: signingCredentials);

                var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

                return Results.Ok(token);
            });
        }
    }
}