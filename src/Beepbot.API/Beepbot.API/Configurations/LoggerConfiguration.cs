using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using Serilog;
using Serilog.Events;
using Serilog.Sinks.SystemConsole.Themes;

namespace Beepbot.API.Configurations
{
    /// <summary>
    /// Extension method for IServiceCollection
    /// </summary>
    public static class LoggerConfigurations
    {
        /// <summary>
        /// Adds logging
        /// </summary>
        /// <param name="services">The <see cref="IServiceCollection">services</see> is used to access the service collection</param>
        /// <param name="configuration">Application configuration object</param>
        /// <returns>The service collection</returns>
        public static IServiceCollection AddLogger(this IServiceCollection services, IConfiguration configuration, IHostEnvironment environment)
        {
            var logger = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
                .MinimumLevel.Override("System", LogEventLevel.Information)
                .Enrich.FromLogContext()
                .WriteTo.Console(theme: AnsiConsoleTheme.Code, outputTemplate:
                    "[{Timestamp:HH:mm:ss} {Level:u5}] {Message:lj}{NewLine}{Exception}")
                .WriteTo.ApplicationInsights(TelemetryConfiguration.CreateDefault(), TelemetryConverter.Events);
                
            Log.Logger = logger.CreateLogger();

            return services;
        }
    }
}
