using AutoMapper;
using Beepbot.Application.Features.Soundboard.Queries;
using Beepbot.Domain.Entities;

namespace Beepbot.Application.Features.Soundboard
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Sound, SoundsForGuild.Result>();           

            CreateMap<Sound, Sounds.Result>();
        }
    }
}