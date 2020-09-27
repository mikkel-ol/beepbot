using Microsoft.AspNetCore.Authentication;

namespace Beepbot.API.Configurations
{
    /// <summary>
    ///     Options for Discord Open ID Connect authentication
    /// </summary>
    public class DiscordAuthenticationOptions : AuthenticationSchemeOptions
    {
        /// <summary>
        ///     Default scheme
        /// </summary>
        public const string AuthenticationScheme = "Discord";

        /// <summary>
        ///     Current scheme
        /// </summary>
        public string Scheme => AuthenticationScheme;

        /// <summary>
        ///     The type of authentication
        /// </summary>
        public string AuthenticationType => AuthenticationScheme;
    }
}
