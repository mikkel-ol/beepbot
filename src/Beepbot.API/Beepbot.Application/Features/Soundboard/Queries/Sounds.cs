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
    public class Sounds
    {
        public class Query : IRequest<IEnumerable<Result>>
        {
        }

        public class Result
        {
            public string Id { get; set; }
            public string Title { get; set; }
        }

        public class Validator : AbstractValidator<Query>
        {
            public Validator()
            {
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
                var sounds = context.Sounds.AsEnumerable();
    
                var result = mapper.Map<IEnumerable<Result>>(sounds);

                return Task.FromResult(result);
            }
        }
    }
}