using AuthenticationService.Identity;
using Microsoft.AspNetCore.Identity;

namespace AuthenticationService.Endpoints
{
    public static class UsersEndpoint
    {
        public static void MapUsersEndpoint(this IEndpointRouteBuilder endpoint)
        {
            endpoint.MapPost("/users/create", async (UserDto userDto, UserManager<User> userManager) =>
            {
                if (await userManager.FindByEmailAsync(userDto.Email) != null)
                {
                    return Results.BadRequest($"User with e-mail '{userDto.Email}' already exists.");
                }

                var user = new User
                {
                    UserName = userDto.Name,
                    Email = userDto.Email
                };

                var createUserResult = await userManager.CreateAsync(user, userDto.Password);

                if (!createUserResult.Succeeded)
                {
                    return Results.BadRequest($"Cannot create user with name '{userDto.Name}'. Errors: {string.Join("\n", createUserResult.Errors.Select(error => error.Description))}");
                }

                var addToRoleResult = await userManager.AddToRoleAsync(user, userDto.Role);

                if (!addToRoleResult.Succeeded)
                {
                    return Results.BadRequest($"Cannot add role '{userDto.Role}' to user with name '{userDto.Name}'. Errors: {string.Join("\n", addToRoleResult.Errors.Select(error => error.Description))}");
                }

                return Results.Ok($"Created user '{userDto.Name}' and assigned role '{userDto.Role}'");
            });
        }
    }
}
