using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace Authentication.Service.Identity
{
    [CollectionName("Users")]
    public class User : MongoIdentityUser<Guid>
    {
    }
}
