using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;

namespace Beepbot.Application.Soundboard
{
    public class PlayAudio
    {
        public class Command : IRequest
        {

        }

        public class Validator : AbstractValidator<Command>
        {
            public Validator()
            {
                
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            public Handler()
            {
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                return Unit.Value;
            }
        }
    }
}