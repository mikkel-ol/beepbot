using System.Collections.Generic;
using System.Linq;

using AutoMapper;
using Beepbot.Persistence;

using FluentValidation;

using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Beepbot.Application.Features.Guilds.Queries
{
    public class GetAllCommonGuilds
    {
        public class Query : IRequest<IEnumerable<Result>>
        {
            public IEnumerable<GuildDto> UserGuilds { get; set; }
        }

        public class Result
        {
            public string Id { get; set; }
            public string Title { get; set; }
            public string Avatar { get; set; }
            public IEnumerable<GuildChannel> Channels { get; set; }
        }

        public class GuildChannel
        {
            public string Id { get; set; }
            public string Type { get; set; }
            public string Name { get; set; }
        }

        public class Validator : AbstractValidator<Query>
        {
            public Validator()
            {
                RuleForEach(x => x.UserGuilds).ChildRules(guild =>
                {
                    guild.RuleFor(x => x.Id).NotNull();
                });
            }
        }

        public class Handler : RequestHandler<Query, IEnumerable<Result>>
        {
            private readonly IMapper mapper;
            private readonly AppDbContext context;

            public Handler(IMapper mapper, AppDbContext context)
            {
                this.mapper = mapper;
                this.context = context;
            }

            protected override IEnumerable<Result> Handle(Query request)
            {
                var commonDbGuilds = context.Guilds
                    .Include(guild => guild.Channels)
                    .AsEnumerable()
                    .Where(guild => request.UserGuilds.Any(userGuild => userGuild.Id == guild.Id))
                    .ToList();

                var commonGuilds = mapper.Map<IEnumerable<Result>>(commonDbGuilds);

                return commonGuilds;
            }
        }
    }
}