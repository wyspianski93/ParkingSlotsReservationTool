using AuthenticationService.Identity;
using Microsoft.AspNetCore.Identity;

namespace AuthenticationService.Endpoints
{
    public static class RolesEndpoint
    {
        public static void MapRolesEndpoint(this IEndpointRouteBuilder endpoint)
        {
            endpoint.MapPost("/roles/create", async (RoleDto role, RoleManager<Role> roleManager) =>
            {
                var createRoleResult = await roleManager.CreateAsync(new Role() { Name = role.Name });

                if (createRoleResult.Succeeded)
                {
                    return Results.Ok($"Created identity role '{role.Name}'");
                }

                return Results.BadRequest($"Cannot create identity role '{role.Name}'. Errors: {string.Join("\n", createRoleResult.Errors.Select(error => error.Description))}");
            });

            endpoint.MapGet("/roles/get/{roleName}", async (string roleName, RoleManager<Role> roleManger) =>
            {
                var role = await roleManger.FindByNameAsync(roleName);

                return Results.Ok(role);
            });
        }
    }
}
