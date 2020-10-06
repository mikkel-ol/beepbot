using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Beepbot.API.Configurations;

[assembly: ApiConventionType(typeof(ApiConventions))] // Adding api conventions to all controllers
namespace Beepbot.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public abstract class ApiController : ControllerBase
    {
    }
}
