using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

using Microsoft.Azure.ServiceBus;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using Beepbot.Application.Features.Guilds.Commands;

using MediatR;

using Newtonsoft.Json;

namespace Beepbot.Application.Services.AzureServiceBus
{
    public interface IAzureServiceBus
    {
        void RegisterListeners();
        Task CloseConnection();
        Task SendSoundboardMessage(string message);
        Task SendDisconnectMessage(string message);
    }

    public class AzureServiceBus : IAzureServiceBus
    {
        private readonly IServiceProvider serviceProvider;
        private readonly IConfiguration configuration;
        private readonly ILogger logger;
        private readonly QueueClient guildAddedClient;
        private readonly QueueClient soundboardPlayClient;
        private readonly QueueClient soundboardDisconnectClient;

        private const string GUILD_ADDED_QUEUE_NAME = "guild_added";
        private const string SOUNDBOARD_PLAY_QUEUE_NAME = "soundboard_play";
        private const string SOUNDBOARD_DISCONNECT_QUEUE_NAME = "soundboard_disconnect";

        public AzureServiceBus(IServiceProvider serviceProvider, IConfiguration configuration, ILogger<AzureServiceBus> logger)
        {
            this.serviceProvider = serviceProvider;
            this.configuration = configuration;

            var connectionString = configuration.GetConnectionString("ServiceBusConnectionString");
            
            this.guildAddedClient = new QueueClient(connectionString, GUILD_ADDED_QUEUE_NAME);
            this.soundboardPlayClient = new QueueClient(connectionString, SOUNDBOARD_PLAY_QUEUE_NAME);
            this.soundboardDisconnectClient = new QueueClient(connectionString, SOUNDBOARD_DISCONNECT_QUEUE_NAME);
        }

        public void RegisterListeners()
        {
            SetupGuildAddedListener();
        }

        public async Task CloseConnection()
        {
            await this.guildAddedClient.CloseAsync();
            await this.soundboardPlayClient.CloseAsync();
            await this.soundboardDisconnectClient.CloseAsync();
        }

        public async Task SendSoundboardMessage(string message)
        {
            Message msg = new Message(Encoding.UTF8.GetBytes(message));
 
            await soundboardPlayClient.SendAsync(msg);
        }

        public async Task SendDisconnectMessage(string message)
        {
            Message msg = new Message(Encoding.UTF8.GetBytes(message));
 
            await soundboardDisconnectClient.SendAsync(msg);
        }

        private void SetupGuildAddedListener()
        {
            var messageHandlerOptions = new MessageHandlerOptions(ExceptionReceivedHandler)
            {
                MaxConcurrentCalls = 1,
                AutoComplete = false
            };

            guildAddedClient.RegisterMessageHandler(OnGuildAddedMessage, messageHandlerOptions);
        }

        private async Task OnGuildAddedMessage(Message message, CancellationToken token)
        {
            var request = JsonConvert.DeserializeObject<AddGuild.Command>(Encoding.UTF8.GetString(message.Body));

            using (var scope = serviceProvider.CreateScope())
            {
                var provider = scope.ServiceProvider;
                var mediator = provider.GetService<IMediator>();

                await mediator.Send(request);
            }

            await this.guildAddedClient.CompleteAsync(message.SystemProperties.LockToken);
        }

        private Task ExceptionReceivedHandler(ExceptionReceivedEventArgs exceptionReceivedEventArgs)
        {
            logger.LogError(exceptionReceivedEventArgs.Exception, "Message handler encountered an exception");
            var context = exceptionReceivedEventArgs.ExceptionReceivedContext;

            logger.LogDebug($"- Endpoint: {context.Endpoint}");
            logger.LogDebug($"- Entity Path: {context.EntityPath}");
            logger.LogDebug($"- Executing Action: {context.Action}");

            return Task.CompletedTask;
        }
    }
}