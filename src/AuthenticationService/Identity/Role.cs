using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace AuthenticationService.Identity
{
    [CollectionName("Roles")]
    public class Role : MongoIdentityRole<Guid>
    {

    }
}
