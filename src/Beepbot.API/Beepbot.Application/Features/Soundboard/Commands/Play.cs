using System.Threading;
using System.Threading.Tasks;

using AutoMapper;
using Beepbot.Application.Services.RabbitMQ;
using FluentValidation;

using MediatR;

namespace Beepbot.Application.Features.Soundboard.Commands
{
    public class Play
    {
        public class Command : IRequest<Result>
        {
            public int AudioId { get; set; }
        }

        public class Result
        {
        }

        public class Validator : AbstractValidator<Command>
        {
            public Validator()
            {
            }
        }

        public class Handler : IRequestHandler<Command, Result>
        {
            private readonly IMapper mapper;
            private readonly IRabbitMQService rabbitService;

            public Handler(IMapper mapper, IRabbitMQService rabbitService)
            {
                this.mapper = mapper;
                this.rabbitService = rabbitService;
            }

            public Task<Result> Handle(Command request, CancellationToken cancellationToken)
            {
                rabbitService.SendMessage("Hej med dig!");

                return Task.FromResult(new Result());
            }
        }
    }
}