using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Authentication.Service.Dto;
using Authentication.Service.Identity;
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

                var signingCredentials =
                    new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtConfig.Key)),
                        SecurityAlgorithms.HmacSha256);

                var roles = await userManager.GetRolesAsync(user);

                var claims = roles
                    .Select(role => new Claim(ClaimTypes.Role, role))
                    .Union(new List<Claim>() { new(ClaimsConstants.UserId, user.Id.ToString()) }).ToList();

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