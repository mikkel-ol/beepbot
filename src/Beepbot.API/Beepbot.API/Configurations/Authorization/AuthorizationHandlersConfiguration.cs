using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using Beepbot.API.Authorization.Handlers.Guild.Requirements;

namespace Beepbot.API.Configurations.Authorization
{
    /// <summary>
    ///     Configuration of authentication
    /// </summary>
    public static class AuthorizationHandlersConfiguration
    {
        /// <summary>
        ///     Adds Authorization handlers to services.
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        /// <param name="env"></param>
        /// <returns></returns>
        public static IServiceCollection AddAuthorizationHandlers(this IServiceCollection services,
            IConfiguration configuration, IHostEnvironment env)
        {
            services.AddTransient<IAuthorizationHandler, InGuildHandler>();

            return services;
        }
    }
}
