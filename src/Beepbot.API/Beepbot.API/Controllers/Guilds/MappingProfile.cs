using AutoMapper;
using Beepbot.Application.Features.Soundboard.Queries;

namespace Beepbot.API.Controllers.Guilds
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Beepbot.API.Controllers.Guilds.GuildDto, Beepbot.Application.Features.Guilds.Queries.GuildDto>();
            CreateMap<string, SoundsForGuild.Query>()
                .ForMember(dest => dest.GuildId, opts => opts.MapFrom(src => src));
        }
    }
}