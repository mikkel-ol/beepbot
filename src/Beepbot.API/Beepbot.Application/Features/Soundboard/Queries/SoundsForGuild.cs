using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using AutoMapper;

using Beepbot.Persistence;

using FluentValidation;

using MediatR;

namespace Beepbot.Application.Features.Soundboard.Queries
{
    public class SoundsForGuild
    {
        public class Query : IRequest<IEnumerable<Result>>
        {
            public string GuildId { get; set; }
        }

        public class Result
        {
            public long Id { get; set; }
            public string Title { get; set; }
        }

        public class Validator : AbstractValidator<Query>
        {
            public Validator()
            {
                RuleFor(x => x.GuildId).NotNull();
            }
        }

        public class Handler : IRequestHandler<Query, IEnumerable<Result>>
        {
            private readonly IMapper mapper;
            private readonly AppDbContext context;

            public Handler(IMapper mapper, AppDbContext context)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public Task<IEnumerable<Result>> Handle(Query request, CancellationToken cancellationToken)
            {
                var sounds = context.Sounds
                    .Where(sound => sound.GuildId == request.GuildId)
                    .AsEnumerable();
    
                var result = mapper.Map<IEnumerable<Result>>(sounds);

                return Task.FromResult(result);
            }
        }
    }
}