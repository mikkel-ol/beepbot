using System.ComponentModel.DataAnnotations.Schema;

namespace Beepbot.Domain.Entities
{
    public abstract class GuildChannel
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Id { get; set; }
        public string Name { get; set; }
        public string GuildId { get; set; }
        public Guild Guild { get; set; }
    }
}