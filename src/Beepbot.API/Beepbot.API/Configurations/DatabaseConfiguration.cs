using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using Beepbot.Persistence;

namespace Beepbot.API.Configurations
{
    /// <summary>
    ///     Configuration of database
    /// </summary>
    public static class DatabaseConfiguration
    {
        /// <summary>
        ///     Adds SQL Server database
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        /// <param name="env"></param>
        /// <returns></returns>
        public static IServiceCollection AddDatabase(this IServiceCollection services,
            IConfiguration configuration, IHostEnvironment env)
        {
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("MainDatabase")));

            return services;
        }
    }
}
