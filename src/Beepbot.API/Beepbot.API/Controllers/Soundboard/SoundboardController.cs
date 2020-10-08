using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using AutoMapper;

using Beepbot.Application.Features.Soundboard.Queries;

using MediatR;

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

        /// <summary>
        ///     User endpoint
        /// </summary>
        /// <returns>User DTO with information</returns>
        [HttpGet]
        public async Task<ActionResult<SoundDTO>> Get()
        {
            return Ok(await mediator.Send(new Sounds.Query()));
        }
    }
}