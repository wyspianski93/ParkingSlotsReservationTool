using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace Authentication.Service.Identity
{
    [CollectionName("Roles")]
    public class Role : MongoIdentityRole<Guid>
    {

    }
}
