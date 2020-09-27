namespace Beepbot.API.Configurations
{
    public class RabbitMQOptions
    {
        public string Host { get; set; }
        public Queues Queues { get; set; }
    }

    public class Queues
    {
        public string Soundboard { get; set; }
    }
}
