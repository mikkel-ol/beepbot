using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using Beepbot.Application.Services.RabbitMQ;

namespace Beepbot.API.Extensions
{
    public static class ApplicationBuilderExtentions
    {
        // The simplest way to store a single long-living object, just for example.
        private static IRabbitMQService listener { get; set; }

        public static IApplicationBuilder UseRabbitMqListener(this IApplicationBuilder app)
        {
            listener = app.ApplicationServices.GetService<IRabbitMQService>();

            var lifetime = app.ApplicationServices.GetService<IHostApplicationLifetime>();

            lifetime.ApplicationStarted.Register(OnStarted);

            // Press Ctrl+C to reproduce if your app runs in Kestrel as a console app
            lifetime.ApplicationStopping.Register(OnStopping);

            return app;
        }

        private static void OnStarted()
        {
            listener.RegisterListeners();
        }

        private static void OnStopping()
        {
            listener.DeregisterListeners();
        }
    }
}