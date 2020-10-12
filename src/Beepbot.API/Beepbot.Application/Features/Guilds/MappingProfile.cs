using AutoMapper;
using Beepbot.Application.Features.Guilds.Commands;
using Beepbot.Application.Features.Guilds.Queries;
using Beepbot.BlobStorage.Dtos;
using Beepbot.Domain.Entities;

namespace Beepbot.Application.Features.Guilds
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Guild, GetAllCommonGuilds.Result>();

            CreateMap<AddGuild.Command, Guild>();

            CreateMap<AddSoundToGuild.Command, AudioFileDto>()
                .ForMember(dest => dest.Name, opts => opts.MapFrom(src => src.SoundName))
                .ForMember(dest => dest.FileStream, opts => opts.MapFrom(src => src.Audio));
            
            CreateMap<AddSoundToGuild.Command, Sound>()
                .ForMember(dest => dest.Title, opts => opts.MapFrom(src => src.SoundName))
                .ForMember(dest => dest.Id, opts => opts.Ignore())
                .ForMember(dest => dest.Guild, opts => opts.Ignore());

            CreateMap<Sound, AddSoundToGuild.Result>();
        }
    }
}