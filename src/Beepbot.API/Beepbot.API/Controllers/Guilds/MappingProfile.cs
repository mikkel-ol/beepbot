using AutoMapper;

namespace Beepbot.API.Controllers.Guilds
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Beepbot.API.Controllers.Guilds.GuildDto, Beepbot.Application.Features.Guilds.Queries.GuildDto>();
        }
    }
}