using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using AutoMapper;

using Beepbot.Application.Features.Guilds.Commands;
using Beepbot.Application.Features.Guilds.Queries;
using Beepbot.Application.Features.Soundboard.Queries;
using Beepbot.API.Authorization;
using Beepbot.API.Authorization.Handlers.Guild.Requirements;
using Beepbot.Infrastructure.Extensions;

using MediatR;

using Newtonsoft.Json;

namespace Beepbot.API.Controllers.Guilds
{
    public class GuildsController : ApiController
    {
        private readonly IMapper mapper;
        private readonly IMediator mediator;
        private readonly IAuthorizationService authorizationService;

        public GuildsController(IMapper mapper, IMediator mediator, IAuthorizationService authorizationService)
        {
            this.mapper = mapper;
            this.mediator = mediator;
            this.authorizationService = authorizationService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetAllCommonGuilds.Result>>> GetAllCommonGuilds()
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

        [HttpGet("{guildId}/sounds")]
        public async Task<ActionResult<IEnumerable<SoundsForGuild.Result>>> GetAllSoundsForGuild(string guildId)
        {
            var authResult = await authorizationService.AuthorizeAsync(User, guildId, new GuildRequirement());

            if (!authResult.Succeeded)
            {
                return StatusCode(StatusCodes.Status403Forbidden, $"You are not part of guild with ID {guildId}");
            }

            var request = mapper.Map<SoundsForGuild.Query>(guildId);

            var result = await mediator.Send(request);

            return Ok(result);
        }

        [HttpPost("{guildId}/sounds")]
        public async Task<ActionResult> AddAudioForGuild(string guildId, [FromForm] IFormFile file)
        {
            var authResult = await authorizationService.AuthorizeAsync(User, guildId, new GuildRequirement());

            if (!authResult.Succeeded)
            {
                return StatusCode(StatusCodes.Status403Forbidden, $"You are not part of guild with ID {guildId}");
            }

            var fileStream = file.OpenReadStream();

            var result = await mediator.Send(new AddSoundToGuild.Command
            {
                GuildId = guildId,
                SoundName = file.FileName,
                Audio = fileStream,
            });

            return Ok(result);
        }
    }
}