using Authentication.Service.Dto;
using Authentication.Service.Identity;
using Microsoft.AspNetCore.Identity;

namespace Authentication.Service.Endpoints
{
    public static class UsersEndpoint
    {
        public static void MapUsersEndpoint(this IEndpointRouteBuilder endpoint)
        {
            endpoint.MapPost("/users/create", async (UserCreateDto usg, UserManager<User> userManager) =>
            {
                if (await userManager.FindByEmailAsync(usg.Email) != null)
                {
                    return Results.BadRequest($"User with e-mail '{usg.Email}' already exists.");
                }

                var user = new User
                {
                    UserName = usg.Name,
                    Email = usg.Email
                };

                var createUserResult = await userManager.CreateAsync(user, usg.Password);

                if (!createUserResult.Succeeded)
                {
                    return Results.BadRequest($"Cannot create user with name '{usg.Name}'. Errors: {string.Join("\n", createUserResult.Errors.Select(error => error.Description))}");
                }

                var addToRoleResult = await userManager.AddToRoleAsync(user, "SuperAdmin");

                if (!addToRoleResult.Succeeded)
                {
                    return Results.BadRequest($"Cannot add role 'SuperAdmin' to user with name '{usg.Name}'. Errors: {string.Join("\n", addToRoleResult.Errors.Select(error => error.Description))}");
                }

                return Results.Ok($"Created user '{usg.Name}' and assigned role 'SuperAdmin'.");
            });
        }
    }
}
