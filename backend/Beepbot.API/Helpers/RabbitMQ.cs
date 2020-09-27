using System;
using Beepbot.API.Configurations;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;

namespace Beepbot.API.Helpers
{
    public class RabbitMQ : IRabbitMQ, IDisposable
    {
        private readonly IOptions<RabbitMQOptions> _options;

        private static ConnectionFactory _factory;
        private static IConnection _connection;
        private static IModel _model;

        public RabbitMQ(IOptions<RabbitMQOptions> options)
        {
            _options = options;

            _factory = new ConnectionFactory() 
            { 
                HostName =  _options.Value.Host
            };

            _connection = _factory.CreateConnection();
            _model = _connection.CreateModel();

            _model.QueueDeclare(
                queue: _options.Value.Queues.Soundboard,
                durable: false,
                exclusive: false,
                autoDelete: false,
                arguments: null
            );
        }

        public void Dispose()
        {
            _connection.Close();
        }

        public void Send()
        {
            
        }

        public void Receive()
        {

        }
    }
}