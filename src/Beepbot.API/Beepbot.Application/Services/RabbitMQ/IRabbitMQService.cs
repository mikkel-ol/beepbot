using System;
using System.Text;

using Microsoft.Extensions.Configuration;

using RabbitMQ.Client;

namespace Beepbot.Application.Services.RabbitMQ
{
    public interface IRabbitMQService
    {
        void SendMessage(string message);
    }

    public class RabbitMQService : IRabbitMQService
    {
        private readonly IConnection connection;

        public RabbitMQService(IConfiguration configuration)
        {
            var factory = new ConnectionFactory()
            {
                HostName = configuration.GetConnectionString("RabbitMq")
            };

            this.connection = factory.CreateConnection();
        }

        public void SendMessage(string message)
        {
            using (var channel = connection.CreateModel())
            {
                var body = Encoding.UTF8.GetBytes(message);

                channel.QueueDeclare("soundboard", exclusive: false, durable: false, autoDelete: true);
                channel.BasicPublish("soundboard", routingKey: "soundboard", basicProperties: null, body: body);
            }
        }
    }
}