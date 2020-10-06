using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Beepbot.API.Configurations
{
    public static class SignalRConfiguration
    {
        public static IServiceCollection AddSignalR(this IServiceCollection services,
            IConfiguration configuration, IHostEnvironment env)
        {
            services.AddSignalR();

            return services;
        }
    }
}