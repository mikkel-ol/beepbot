using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Http;

namespace Beepbot.API.Middleware
{
    /// <summary>
    ///     Override of default OAuth event handlers
    ///     Used to attach custom claims based on roles in GSuite
    /// </summary>
    public class DiscordAuthEvents : OAuthEvents
    {
        public override async Task TicketReceived(TicketReceivedContext context)
        {
            await base.TicketReceived(context);
        }

        /// <summary>
        ///     Override login event
        ///     Used to return 401 when trying to access resource unauthenticated
        /// </summary>
        /// <param name="context">Redirect context</param>
        /// <returns>Empty Task that is completed</returns>
        public override Task RedirectToAuthorizationEndpoint(RedirectContext<OAuthOptions> context)
        {
            if (context.Request.Path.StartsWithSegments("/api/auth/login"))
            {
                return base.RedirectToAuthorizationEndpoint(context);
            }

            if (context.Request.Path.StartsWithSegments("/api") && context.Response.StatusCode == StatusCodes.Status200OK)
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            }

            return Task.CompletedTask;
        }
    }
}
