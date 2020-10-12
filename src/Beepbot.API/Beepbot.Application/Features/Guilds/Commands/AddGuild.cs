using System.Threading;
using System.Threading.Tasks;

using AutoMapper;
using Beepbot.Domain.Entities;
using Beepbot.Infrastructure.Exceptions;
using Beepbot.Persistence;
using FluentValidation;

using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Beepbot.Application.Features.Guilds.Commands
{
    public class AddGuild
    {
        public class Command : IRequest<Unit>
        {
            public string Id { get; set; }
            public string Title { get; set; }
            public string Avatar { get; set; }
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
                if (await context.Guilds.AnyAsync(guild => guild.Id.ToString() == request.Id))
                    return Unit.Value;

                var dbServer = mapper.Map<Guild>(request);

                await context.Guilds.AddAsync(dbServer);

                await context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}