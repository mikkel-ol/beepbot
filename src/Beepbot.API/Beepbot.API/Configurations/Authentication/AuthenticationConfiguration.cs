using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using AspNet.Security.OAuth.Discord;

using Beepbot.API.Middleware;
using Beepbot.API.Options;
using Beepbot.Domain.Authorization;
using Beepbot.API.Authorization;

namespace Beepbot.API.Configurations.Authentication
{
    /// <summary>
    ///     Configuration of authentication
    /// </summary>
    public static class AuthenticationConfiguration
    {
        /// <summary>
        ///     Adds authentication to services. Uses Discord OAuth
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        /// <param name="env"></param>
        /// <returns></returns>
        public static IServiceCollection AddAuthentication(this IServiceCollection services,
            IConfiguration configuration, IHostEnvironment env)
        {
            var discordOptions = configuration.GetSection(DiscordOptions.Discord).Get<DiscordOptions>();

            services
                .AddAuthentication(options =>
                {
                    options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = DiscordAuthenticationDefaults.AuthenticationScheme;
                })
                .AddDiscord(options =>
                {
                    options.ClientId = discordOptions.ClientId;
                    options.ClientSecret = discordOptions.ClientSecret;

                    options.Events = new DiscordAuthEvents();

                    options.Scope.Add("guilds");
                })
                .AddCookie(options =>
                {
                    options.LoginPath = "/api/auth/login";

                    options.Events = new CookieAuthEvents();

                    options.Cookie.Name = "BeepbotCookie";
                    options.Cookie.SameSite = SameSiteMode.None;
                    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                });

            services.AddAuthorization(options =>
            {
                options.AddPolicy(name: Policies.Admin, policy =>
                {
                    policy.AuthenticationSchemes.Add(CookieAuthenticationDefaults.AuthenticationScheme);
                    policy.RequireClaim(CustomClaimTypes.IsAdmin);
                });

                options.AddPolicy(name: Policies.Hub, policy =>
                {
                    policy.AuthenticationSchemes.Add(CookieAuthenticationDefaults.AuthenticationScheme);
                    policy.RequireAuthenticatedUser();
                });
            });

            return services;
        }
    }
}
