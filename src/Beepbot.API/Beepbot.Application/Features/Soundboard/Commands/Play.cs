using System.Threading;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using AutoMapper;

using Beepbot.Application.Services.RabbitMQ;
using Beepbot.Domain.Entities;
using Beepbot.Infrastructure.Exceptions;
using Beepbot.Infrastructure.Extensions;
using Beepbot.Persistence;

using FluentValidation;

using MediatR;

using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Beepbot.BlobStorage;
using Beepbot.Application.Services.AzureServiceBus;

namespace Beepbot.Application.Features.Soundboard.Commands
{
    public class Play
    {
        public class Command : IRequest<Unit>
        {
            public string VoiceChannelId { get; set; }
            public long SoundId { get; set; }
        }

        public class Validator : AbstractValidator<Command>
        {
            public Validator()
            {
                RuleFor(x => x.VoiceChannelId).NotNull();
                RuleFor(x => x.SoundId).NotNull();
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
                var sound = await context.Sounds.FirstOrDefaultAsync(sound => sound.Id == request.SoundId);

                if (sound.IsNull())
                {
                    throw new NotFoundException(request.SoundId, typeof(Sound));
                }

                var sasToken = blobStorageService.GenerateSASTokenForContainer(sound.GuildId.ToString());

                var messageObj = new
                {
                    VoiceChannelId = request.VoiceChannelId,
                    AudioUrl = sound.Url + "?" + sasToken
                };

                var jsonSettings = new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                };

                var message = JsonConvert.SerializeObject(messageObj, jsonSettings);

                await azureServiceBus.SendSoundboardMessage(message);

                return Unit.Value;
            }
        }
    }
}