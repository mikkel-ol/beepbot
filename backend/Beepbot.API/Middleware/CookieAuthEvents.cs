using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using static Microsoft.AspNetCore.Http.StatusCodes;

namespace Beepbot.API.Middleware
{
    /// <summary>
    ///     Override of default cookie authentication events
    ///     Used to set custom HTTP 401 and 403 behaviour
    /// </summary>
    public class CookieAuthEvents : CookieAuthenticationEvents
    {
        /// <summary>
        ///     Override login event
        ///     Used to return 401 when trying to access resource unauthenticated
        /// </summary>
        /// <param name="context">Redirect context</param>
        /// <returns>Empty Task that is completed</returns>
        public override Task RedirectToLogin(RedirectContext<CookieAuthenticationOptions> context)
        {
            if (context.Request.Path.StartsWithSegments("/api/auth/login"))
            {
                return base.RedirectToLogin(context);
            }

            if (context.Request.Path.StartsWithSegments("/api") && context.Response.StatusCode == Status200OK)
            {
                context.Response.StatusCode = Status401Unauthorized;
            }

            return Task.CompletedTask;
        }

        /// <summary>
        ///     Called when resource access is denied - both for not authenticated and unauthorized (401 and 403).
        ///     Therefore the status header is manually set to differentiate between the two.
        /// </summary>
        /// <param name="context">HTTP context</param>
        /// <returns>Empty Task</returns>
        public override Task RedirectToAccessDenied(RedirectContext<CookieAuthenticationOptions> context)
        {
            if (context.HttpContext.User.Identity.IsAuthenticated)
            {
                context.Response.StatusCode = Status403Forbidden;
            }

            return Task.CompletedTask;
        }
    }
}
