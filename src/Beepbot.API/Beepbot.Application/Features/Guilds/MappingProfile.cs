using AutoMapper;
using Beepbot.Application.Features.Guilds.Commands;
using Beepbot.Application.Features.Guilds.Queries;
using Beepbot.BlobStorage.Dtos;
using Beepbot.Domain.Entities;
using Beepbot.Infrastructure.Extensions;

namespace Beepbot.Application.Features.Guilds
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Guild, GetAllCommonGuilds.Result>();

            CreateMap<GuildChannel, GetAllCommonGuilds.GuildChannel>()
                .ForMember(dest => dest.Type, opts => opts.MapFrom(src => src.GetType().Name.ToLower().TrimChannelType()));

            CreateMap<AddGuild.Command, Guild>();

            CreateMap<AddGuild.GuildChannel, GuildChannel>()
                .ConvertUsing<GuildChannelConverter>();

            CreateMap<AddGuild.GuildChannel, TextChannel>();
            CreateMap<AddGuild.GuildChannel, VoiceChannel>();
            CreateMap<AddGuild.GuildChannel, CategoryChannel>();

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