using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace AuthenticationService.Identity
{
    [CollectionName("Users")]
    public class User : MongoIdentityUser<Guid>
    {
    }
}
