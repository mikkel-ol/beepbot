using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Beepbot.Domain.Entities
{
    public class Guild
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Id { get; set; }
        public string Title { get; set; }
        public string Avatar { get; set; }
        public ICollection<Sound> Sounds { get; set; }
        public ICollection<GuildChannel> Channels { get; set; }
    }
}