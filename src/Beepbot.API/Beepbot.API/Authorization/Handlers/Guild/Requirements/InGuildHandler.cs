using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;

using Beepbot.Infrastructure.Extensions;

using Newtonsoft.Json;

namespace Beepbot.API.Authorization.Handlers.Guild.Requirements
{
    public class InGuildHandler : AuthorizationHandler<GuildRequirement, long>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, GuildRequirement requirement, long resource)
        {
            var claim = context.User.Claims.FirstOrDefault(claim => claim.Type == CustomClaimTypes.Guilds).Value;

            if (claim.IsNull())
            {
                context.Fail();
            }

            var guilds = JsonConvert.DeserializeObject<IEnumerable<Guild>>(claim);

            if (guilds.Any(guild => guild.Id == resource.ToString()))
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }

    // <summary>
    /// Object for temporary holding Discord partial guild
    /// Used for adding to claims
    /// </summary>
    public class Guild
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
    }
}