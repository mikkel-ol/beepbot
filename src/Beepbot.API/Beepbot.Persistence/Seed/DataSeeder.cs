using System;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Beepbot.Persistence.Seed
{
    public static class DataSeeder
    {
        public static void Initialize(IServiceProvider serviceProvider, bool createAdminUser = false)
        {
            var provider = serviceProvider.CreateScope().ServiceProvider;

            using (var context = provider.GetRequiredService<AppDbContext>())
            {                
                context.Database.Migrate();
            }
        }
        
        public static void SeedData(this AppDbContext context)
        {
            SeedEverything(context);
        }

        private static void SeedEverything(AppDbContext context)
        {
            context.Database.EnsureCreated();

            // ! Don't seed if anything is there
            // if (context.Entities.Any())
            // {
            //     return;
            // }

            // ! Do seeding here
        }
    }
}