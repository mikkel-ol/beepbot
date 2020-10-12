using AutoMapper;

using Beepbot.Application.Features.Soundboard.Commands;

namespace Beepbot.API.Hubs.Soundboard
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<PlayDto.Post, Play.Command>();
        }
    }
}