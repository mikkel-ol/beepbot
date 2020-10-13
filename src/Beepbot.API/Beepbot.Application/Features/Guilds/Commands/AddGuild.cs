using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

using AutoMapper;
using Beepbot.Domain.Entities;
using Beepbot.Infrastructure.Extensions;
using Beepbot.Persistence;
using FluentValidation;

using MediatR;

namespace Beepbot.Application.Features.Guilds.Commands
{
    public class AddGuild
    {
        public class Command : IRequest<Unit>
        {
            public string Id { get; set; }
            public string Title { get; set; }
            public string Avatar { get; set; }
            public IEnumerable<GuildChannel> Channels { get; set; }
        }

        public class Validator : AbstractValidator<Command>
        {
            public Validator()
            {
                RuleFor(x => x.Id).NotNull();
                RuleFor(x => x.Title).NotNull();
            }
        }

        public class Handler : IRequestHandler<Command, Unit>
        {
            private readonly IMapper mapper;
            private readonly AppDbContext context;

            public Handler(IMapper mapper, AppDbContext context)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // Ignore if already exists
                if (context.Guilds.Find(request.Id).IsNotNull())
                    return Unit.Value;

                var dbGuild = mapper.Map<Guild>(request);

                await context.Guilds.AddAsync(dbGuild);

                await context.SaveChangesAsync();

                return Unit.Value;
            }
        }

        public class GuildChannel
        {
            public string Id { get; set; }
            public string Type { get; set; }
            public string Name { get; set; }
        }
    }
}