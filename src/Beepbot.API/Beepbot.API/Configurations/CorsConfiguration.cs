using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;

namespace Beepbot.API.Configurations
{
    /// <summary>
    ///     CORS configuration
    /// </summary>
    public static class CorsConfiguration
    {
        public static IApplicationBuilder UseCors(this IApplicationBuilder app, IHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                app.UseCors(builder =>
                    builder
                        .WithOrigins("http://localhost:4200")
                        .WithOrigins("https://localhost:4200")
                        .WithOrigins("http://localhost:3000")
                        .WithOrigins("https://localhost:3000")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            }
            else
            {
                app.UseCors(builder =>
                    builder
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());

                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
                app.UseHttpsRedirection();
            }

            return app;
        }
    }
}
