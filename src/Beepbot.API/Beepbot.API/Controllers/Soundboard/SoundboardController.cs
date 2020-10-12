using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using AutoMapper;

using Beepbot.Application.Features.Soundboard.Queries;

using MediatR;
using Beepbot.Domain.Authorization;
using Microsoft.AspNetCore.Authorization;

namespace Beepbot.API.Controllers.Soundboard
{
    public class SoundboardController : ApiController
    {
        private readonly IMapper mapper;
        private readonly IMediator mediator;

        public SoundboardController(IMapper mapper, IMediator mediator)
        {
            this.mapper = mapper;
            this.mediator = mediator;
        }

        [Authorize(Policy = Policies.Admin)]
        [HttpGet]
        public async Task<ActionResult<SoundDTO>> Get()
        {
            return Ok(await mediator.Send(new Sounds.Query()));
        }
    }
}