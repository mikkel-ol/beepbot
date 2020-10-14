using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using Beepbot.Application.Services.RabbitMQ;
using Microsoft.Azure.ServiceBus;
using Beepbot.Application.Services.AzureServiceBus;

namespace Beepbot.API.Extensions
{
    public static class ApplicationBuilderExtentions
    {
        // The simplest way to store a single long-living object, just for example.
        private static IAzureServiceBus serviceBus { get; set; }

        public static IApplicationBuilder UseAzureServiceBus(this IApplicationBuilder app)
        {
            serviceBus = app.ApplicationServices.GetService<IAzureServiceBus>();

            var lifetime = app.ApplicationServices.GetService<IHostApplicationLifetime>();

            lifetime.ApplicationStarted.Register(OnStarted);

            // Press Ctrl+C to reproduce if your app runs in Kestrel as a console app
            lifetime.ApplicationStopping.Register(OnStopping);

            return app;
        }

        private static void OnStarted()
        {
            serviceBus.RegisterListeners();
        }

        private static void OnStopping()
        {
            serviceBus.CloseConnection();
        }
    }
}