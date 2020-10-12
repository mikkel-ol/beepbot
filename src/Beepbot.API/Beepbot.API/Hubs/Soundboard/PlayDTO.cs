namespace Beepbot.API.Hubs.Soundboard
{
    public class PlayDto
    {
        public class Post
        {
            public string VoiceChannelId { get; set; }
            public long SoundId { get; set; }
        }
    }
}
