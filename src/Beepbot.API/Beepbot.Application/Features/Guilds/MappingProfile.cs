using AutoMapper;
using Beepbot.Application.Features.Guilds.Queries;
using Beepbot.Domain.Entities;

namespace Beepbot.Application.Features.Guilds
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Guild, GetAllCommonGuilds.Result>();
        }
    }
}