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

        public class Handler : RequestHandler<Command, Unit>
        {
            private readonly IMapper mapper;
            private readonly AppDbContext context;
            private readonly IRabbitMQService rabbitService;
            private readonly IAzureBlobStorageService blobStorageService;

            public Handler(IMapper mapper, IRabbitMQService rabbitService, AppDbContext context, IAzureBlobStorageService blobStorageService)
            {
                this.mapper = mapper;
                this.context = context;
                this.rabbitService = rabbitService;
                this.blobStorageService = blobStorageService;
            }

            protected override Unit Handle(Command request)
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

                rabbitService.SendDisconnectMessage(message);

                return Unit.Value;
            }
        }
    }
}