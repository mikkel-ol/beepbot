using System;
using System.IO;
using System.Reflection;

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

using Beepbot.Application;

using Swashbuckle.AspNetCore.SwaggerUI;

namespace Beepbot.API.Configurations
{
    /// <summary>
    ///     Configurations for Swagger gen and UI
    /// </summary>
    public static class SwaggerConfiguration
    {
        /// <summary>
        ///     Add swagger gen and ui to services
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Test Mindster",
                    Version = "v1"
                });

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);

                var xmlFeaturesFile = $"{typeof(AssemblyAnchor).Assembly.GetName().Name}.xml";
                var xmlFeaturesPath = Path.Combine(AppContext.BaseDirectory, xmlFeaturesFile);

                options.IncludeXmlComments(xmlPath);
                options.IncludeXmlComments(xmlFeaturesPath);

                // Needs to be there to allow the input classes to have the same name across different namespaces
                options.CustomSchemaIds(o => o.FullName);

                options.DescribeAllParametersInCamelCase();
            });

            return services;
        }

        /// <summary>
        ///     Use swagger to setup endpoint for swagger
        /// </summary>
        /// <param name="app"></param>
        /// <returns></returns>
        public static IApplicationBuilder UseSwagger(this IApplicationBuilder app)
        {
            SwaggerBuilderExtensions.UseSwagger(app);

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "Beepbot v1");
                options.RoutePrefix = "api";

                options.DocExpansion(DocExpansion.None);

                options.DisplayRequestDuration();
            });

            return app;
        }
    }
}
