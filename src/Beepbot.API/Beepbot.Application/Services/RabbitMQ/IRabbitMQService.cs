using System;
using System.Text;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Beepbot.Application.Features.Guilds.Commands;
using Beepbot.Infrastructure.Exceptions;

using MediatR;

using Newtonsoft.Json;

using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace Beepbot.Application.Services.RabbitMQ
{
    public interface IRabbitMQService
    {
        void SendMessage(string message);
        void RegisterListeners();
        void DeregisterListeners();
    }

    public class RabbitMQService : IRabbitMQService
    {
        private readonly IServiceProvider serviceProvider;
        private readonly IConnection connection;
        private readonly IModel channel;

        public RabbitMQService(IConfiguration configuration, IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;

            var factory = new ConnectionFactory()
            {
                HostName = configuration.GetConnectionString("RabbitMq")
            };

            this.connection = factory.CreateConnection();
            this.channel = connection.CreateModel();
        }

        public void SendMessage(string message)
        {
            using (var channel = connection.CreateModel())
            {
                var body = Encoding.UTF8.GetBytes(message);

                channel.QueueDeclare("soundboard_play", exclusive: false, durable: false, autoDelete: true);
                channel.BasicPublish("soundboard_play", routingKey: "soundboard_play", basicProperties: null, body: body);
            }
        }

        public void RegisterListeners()
        {
            SetupGuildAddedListener();
        }

        public void DeregisterListeners()
        {
            connection.Close();
        }

        private void SetupGuildAddedListener()
        {
            channel.QueueDeclare(queue: "guild_added", durable: false, exclusive: false, autoDelete: false);
            channel.BasicQos(0, 1, false);
            var consumer = new EventingBasicConsumer(channel);
            channel.BasicConsume(queue: "guild_added", autoAck: true, consumer: consumer);

            consumer.Received += async (model, e) =>
            {
                var body = e.Body.ToArray();

                var props = e.BasicProperties;
                var replyProps = channel.CreateBasicProperties();
                replyProps.CorrelationId = props.CorrelationId;

                try
                {
                    var message = Encoding.UTF8.GetString(body);

                    var request = JsonConvert.DeserializeObject<AddGuild.Command>(message);

                    using (var scope = serviceProvider.CreateScope())
                    {
                        var provider = scope.ServiceProvider;
                        var mediator = provider.GetService<IMediator>();

                        await mediator.Send(request);
                    }
                }
                catch (Exception exception)
                {
                    throw new RabbitMqException(exception.Message);
                }
                finally
                {
                    // channel.BasicPublish(exchange: "", routingKey: props.ReplyTo, basicProperties: replyProps);
                    // channel.BasicAck(deliveryTag: e.DeliveryTag, multiple: true);
                }
            };

        }
    }
}