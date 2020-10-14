using System.Threading;
using System.Threading.Tasks;

using AutoMapper;

using Beepbot.Application.Services.AzureServiceBus;
using Beepbot.BlobStorage;
using Beepbot.Persistence;

using FluentValidation;

using MediatR;

using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Beepbot.Application.Features.Soundboard.Commands
{
    public class Disconnect
    {
        public class Command : IRequest<Unit>
        {
            public string GuildId { get; set; }
        }

        public class Validator : AbstractValidator<Command>
        {
            public Validator()
            {
                RuleFor(x => x.GuildId).NotNull();
            }
        }

        public class Handler : IRequestHandler<Command, Unit>
        {
            private readonly IMapper mapper;
            private readonly AppDbContext context;
            private readonly IAzureServiceBus azureServiceBus;
            private readonly IAzureBlobStorageService blobStorageService;

            public Handler(IMapper mapper, IAzureServiceBus azureServiceBus, AppDbContext context, IAzureBlobStorageService blobStorageService)
            {
                this.mapper = mapper;
                this.context = context;
                this.azureServiceBus = azureServiceBus;
                this.blobStorageService = blobStorageService;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var messageObj = new
                {
                    GuildId = request.GuildId,
                };

                var jsonSettings = new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                };

                var message = JsonConvert.SerializeObject(messageObj, jsonSettings);

                await azureServiceBus.SendDisconnectMessage(message);

                return Unit.Value;
            }
        }
    }
}