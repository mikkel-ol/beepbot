namespace Beepbot.Domain.Entities
{
    public class Sound
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string GuildId { get; set; }
        public Guild Guild { get; set; }
        public string Url { get; set; }
    }
}