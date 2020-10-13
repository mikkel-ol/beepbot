using AutoMapper;
using Beepbot.Application.Features.Guilds.Commands;
using Beepbot.Domain.Entities;
using Beepbot.Infrastructure.Exceptions;

namespace Beepbot.Application.Features.Guilds
{
    public class GuildChannelConverter : ITypeConverter<AddGuild.GuildChannel, GuildChannel>
    {
        public GuildChannel Convert(AddGuild.GuildChannel source, GuildChannel destination, ResolutionContext context) =>
            source.Type switch
            {
                "text" => context.Mapper.Map<TextChannel>(source),
                "voice" => context.Mapper.Map<VoiceChannel>(source),
                "category" => context.Mapper.Map<CategoryChannel>(source),
                _ => throw new NotFoundException(source.Type, typeof(GuildChannel))
            };
    }
}