using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Http;

using Beepbot.API.Authorization;
using Beepbot.API.Configurations.Authentication;

using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Beepbot.API.Middleware
{
    /// <summary>
    ///     Override of default OAuth event handlers
    ///     Used to attach custom claims based on roles in GSuite
    /// </summary>
    public class DiscordAuthEvents : OAuthEvents
    {
        /// <summary>
        /// Override middleware after authentication through Discord is done and before authentication ticket is created
        /// Retrieves all guilds for a user and attaches it to claims principal
        /// </summary>
        public override async Task CreatingTicket(OAuthCreatingTicketContext context)
        {
            using var request = new HttpRequestMessage(HttpMethod.Get, DiscordAuthenticationDefaultsExtensions.GuildsInformationEndpoint);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", context.AccessToken);

            using var response = await context.Backchannel.SendAsync
            (
                request, 
                HttpCompletionOption.ResponseHeadersRead, 
                context.Request.HttpContext.RequestAborted
            );

            using var payload = JsonDocument.Parse(await response.Content.ReadAsStringAsync());

            var guilds = JsonConvert.DeserializeObject<List<Guild>>(payload.RootElement.GetRawText());

            var serializerSettings = new JsonSerializerSettings();
            serializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            var claims = new List<Claim>
            {
                new Claim(CustomClaimTypes.Guilds, JsonConvert.SerializeObject(guilds, serializerSettings))
            };

            var appIdentity = new ClaimsIdentity(claims);

            context.Principal.AddIdentity(appIdentity);

            await base.CreatingTicket(context);
        }

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

    /// <summary>
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
