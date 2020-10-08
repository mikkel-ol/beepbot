namespace Beepbot.API.Configurations.Authentication
{
    /// <summary>
    /// Extended default values used by the Discord authentication middleware.
    /// </summary>
    public static class DiscordAuthenticationDefaultsExtensions
    {
        /// <summary>
        /// Default value for guilds endpoint for user.
        /// </summary>
        public const string GuildsInformationEndpoint = "https://discord.com/api/users/@me/guilds";
    }
}