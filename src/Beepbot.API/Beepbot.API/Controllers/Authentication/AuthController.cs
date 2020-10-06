using System.Threading.Tasks;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

using Beepbot.API.Options;

namespace Beepbot.API.Controllers.Authentication
{
    public class AuthController : ApiController
    {
        private readonly IOptions<DiscordOptions> options;

        public AuthController(IOptions<DiscordOptions> options)
        {
            this.options = options;
        }

        /// <summary>
        ///     Authentication endpoint
        ///     Redirects to OAuth provider and redirects client to given URL
        /// </summary>
        /// <param name="returnUrl">Redirect URL after login</param>
        [AllowAnonymous]
        [HttpGet("login")]
        public ActionResult Login(string returnUrl = "/")
        {
            return Challenge(new AuthenticationProperties { RedirectUri = returnUrl });
        }

        /// <summary>
        ///     Sign out endpoint
        /// </summary>
        [AllowAnonymous]
        [HttpPost("logout")]
        public async Task<IActionResult> LogOutAsync()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            return Ok();
        }
    }
}
