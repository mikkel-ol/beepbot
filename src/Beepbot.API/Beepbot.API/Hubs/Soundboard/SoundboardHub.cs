using System.Threading.Tasks;

using AutoMapper;

using Beepbot.Application.Features.Soundboard.Commands;

using MediatR;

namespace Beepbot.API.Hubs.Soundboard
{
    public class SoundboardHub : BaseHub
    {
        private readonly IMediator mediator;
        private readonly IMapper mapper;
        
        public SoundboardHub(IMediator mediator, IMapper mapper)
        {
            this.mediator = mediator;
            this.mapper = mapper;
        }

        public async Task PlaySound(PlayDto.Post request)
        {
            var command = mapper.Map<Play.Command>(request);

            await mediator.Send(command);
        }

        public async Task DisconnectFromVoicechannel(string request)
        {
            var command = mapper.Map<Disconnect.Command>(request);

            await mediator.Send(command);
        }
    }
}