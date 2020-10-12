using System.IO;

namespace Beepbot.BlobStorage.Dtos
{
    public class AudioFileDto
    {
        public string GuildId { get; set; }
        public string Name { get; set; }
        public Stream FileStream { get; set; }
    }
}