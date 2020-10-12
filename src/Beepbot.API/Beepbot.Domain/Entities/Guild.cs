using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Beepbot.Domain.Entities
{
    public class Guild
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public long Id { get; set; }
        public string Title { get; set; }
        public string Avatar { get; set; }
        public ICollection<Sound> Sounds { get; set; }
    }
}