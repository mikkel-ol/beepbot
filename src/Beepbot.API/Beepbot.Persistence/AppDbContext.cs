using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using Beepbot.Infrastructure.Exceptions;
using Beepbot.Persistence.Interfaces;
using Beepbot.Domain.Entities;

namespace Beepbot.Persistence
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<TextChannel>();
            builder.Entity<VoiceChannel>();
            builder.Entity<CategoryChannel>();

            base.OnModelCreating(builder);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            ChangeTracker.DetectChanges();

            var markedAsDelete = ChangeTracker.Entries().Where(x => x.State == EntityState.Deleted);

            var markedAsUpdate = ChangeTracker.Entries().Where(x => x.State == EntityState.Modified);

            foreach (var obj in markedAsDelete)
            {
                if (!(obj.Entity is IIsDeleted entity))
                {
                    continue;
                }

                obj.State = EntityState.Unchanged;
                entity.IsDeleted = true;
            }

            foreach (var obj in markedAsUpdate)
            {
                if (obj.Entity is IIsDeleted entity && entity.IsDeleted)
                {
                    throw new NotFoundException("Not allowed to change deleted object");
                }
            }

            return base.SaveChangesAsync(cancellationToken);
        }

        public DbSet<Sound> Sounds { get; set; }
        public DbSet<Guild> Guilds { get; set; }
        public DbSet<GuildChannel> GuildChannels { get; set; }
    }
}