using System.Diagnostics.CodeAnalysis;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using Beepbot.Application.Services.RabbitMQ;
using Beepbot.API.Configurations;
using Beepbot.API.Configurations.Authentication;
using Beepbot.API.Hubs.Soundboard;

using Beepbot.API.Options;
using Beepbot.API.Extensions;
using Beepbot.API.Configurations.Authorization;
using Beepbot.Domain.Options;

namespace Beepbot.API
{
    [ExcludeFromCodeCoverage]
    public class Startup
    {
        protected readonly IHostEnvironment env;
        protected IConfiguration Configuration { get; }

        public Startup(IHostEnvironment env)
        {
            this.env = env;

            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", false)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true)
                .AddJsonFile("appsettings.Local.json", true, true)
                .AddEnvironmentVariables();

            if (env.IsDevelopment())
            {
                builder.AddUserSecrets<Startup>();
            }

            Configuration = builder.Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddLogger(Configuration, env);

            services.AddDatabase(Configuration, env);

            services.AddAuthentication(Configuration, env);

            services.AddAuthorizationHandlers(Configuration, env);

            services.AddMapper(Configuration, env);

            services.AddMediatR(Configuration, env);

            services.AddValidation(Configuration, env);

            services.AddBlobStorage(Configuration, env);

            services.AddOptions();

            services.Configure<AzureBlobStorageOptions>(Configuration.GetSection("AzureBlobStorage"));

            services.AddSignalR(Configuration, env);

            services.AddSwaggerGen();

            services.AddSingleton<IRabbitMQService, RabbitMQService>();
            services.AddSingleton<IConfiguration>(provider => Configuration);

            services.Configure<DiscordOptions>(Configuration.GetSection(DiscordOptions.Discord));

            services.AddRouting(options => options.LowercaseUrls = true);

            services.AddControllers();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseRabbitMqListener();

            app.UseSwagger();

            app.UseCors(env);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<SoundboardHub>("/hubs/soundboard");
                endpoints.MapControllers();
            });

        }
    }
}
