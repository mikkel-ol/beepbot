using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Beepbot.API.Configurations;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Beepbot.API.Controllers
{
    public class AuthController : ApiController
    {
        /// <summary>
        ///     Authentication endpoint
        ///     Redirects to OAuth provider and redirects client to given URL
        /// </summary>
        /// <param name="returnUrl">Redirect URL after login</param>
        [AllowAnonymous]
        [HttpGet("login")]
        public IActionResult Login(string returnUrl = "/")
        {
            return Challenge(
                new AuthenticationProperties { RedirectUri = returnUrl }, 
                DiscordAuthenticationOptions.AuthenticationScheme
            );
        }

        /// <summary>
        ///     Sign out endpoint
        /// </summary>
        [HttpGet("logout")]
        public async Task<IActionResult> LogOutAsync()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            return Ok();
        }

        [HttpGet("me")]
        public IActionResult Me()
        {
            return Ok(User.Identity.Name);
        }
    }
}
