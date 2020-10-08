using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Beepbot.API.Authorization;
using Beepbot.Application.Features.Guilds.Queries;
using Beepbot.Infrastructure.Extensions;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Beepbot.API.Controllers.Guilds
{
    public class GuildsController : ApiController
    {
        private readonly IMapper mapper;
        private readonly IMediator mediator;

        public GuildsController(IMapper mapper, IMediator mediator)
        {
            this.mapper = mapper;
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllCommonGuilds()
        {
            var guildsClaim = User?.Claims.FirstOrDefault(claim => claim.Type == CustomClaimTypes.Guilds);

            if (guildsClaim.IsNull())
            {
                return BadRequest("No guilds on user");
            }

            var userGuilds = JsonConvert.DeserializeObject<IEnumerable<GuildDto>>(guildsClaim.Value);

            var request = mapper.Map<IEnumerable<Application.Features.Guilds.Queries.GuildDto>>(userGuilds);

            var result = await mediator.Send(new GetAllCommonGuilds.Query
            {
                UserGuilds = request
            });

            return Ok(result);
        }
    }
}