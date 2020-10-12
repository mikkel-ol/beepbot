using System.IO;
using System.Threading;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using AutoMapper;

using Beepbot.BlobStorage;
using Beepbot.BlobStorage.Dtos;
using Beepbot.Domain.Entities;
using Beepbot.Infrastructure.Exceptions;
using Beepbot.Infrastructure.Extensions;
using Beepbot.Persistence;

using FluentValidation;

using MediatR;

namespace Beepbot.Application.Features.Guilds.Commands
{
    public class AddSoundToGuild
    {
        public class Command : IRequest<Result>
        {
            public long GuildId { get; set; }
            public string SoundName { get; set; }
            public Stream Audio { get; set; }
        }

        public class Validator : AbstractValidator<Command>
        {
            public Validator()
            {
                RuleFor(x => x.GuildId).NotNull();
                RuleFor(x => x.SoundName).NotEmpty();
                RuleFor(x => x.Audio).NotNull();
            }
        }

        public class Result
        {
            public long Id { get; set; }
            public string Title { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result>
        {
            private readonly IMapper mapper;
            private readonly AppDbContext context;
            private readonly IAzureBlobStorageService blobStorageService;

            public Handler(IMapper mapper, AppDbContext context, IAzureBlobStorageService blobStorageService)
            {
                this.mapper = mapper;
                this.context = context;
                this.blobStorageService = blobStorageService;
            }

            public async Task<Result> Handle(Command request, CancellationToken cancellationToken)
            {
                var dbGuild = context.Guilds.FirstOrDefaultAsync(guild => guild.Id == request.GuildId);

                if (dbGuild.IsNull())
                {
                    throw new NotFoundException(request.GuildId, typeof(Guild));
                }

                var uploadRequest = mapper.Map<AudioFileDto>(request);

                var audioUrl = await blobStorageService.UploadAudioFileForGuild(uploadRequest);

                var dbSound = mapper.Map<Sound>(request);
                dbSound.Url = audioUrl;

                await context.AddAsync(dbSound);
                await context.SaveChangesAsync();

                var result = mapper.Map<Result>(dbSound);

                return result;
            }
        }
    }
}