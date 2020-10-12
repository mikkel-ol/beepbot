using Beepbot.BlobStorage;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Beepbot.API.Configurations
{
    public static class BlobStorageConfiguration
    {
        public static IServiceCollection AddBlobStorage(this IServiceCollection services,
            IConfiguration configuration, IHostEnvironment env)
        {
            services.AddTransient<IAzureBlobStorageService, AzureBlobStorageService>();

            return services;
        }
    }
}