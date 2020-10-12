using System.Collections.Generic;
using System.Security.Claims;

using AutoMapper;
using Beepbot.API.Authorization;
using static AspNet.Security.OAuth.Discord.DiscordAuthenticationConstants;

namespace Beepbot.API.Controllers.Users
{
    public class ClaimConverter : ITypeConverter<IEnumerable<Claim>, UserDTO>
    {
        public UserDTO Convert(IEnumerable<Claim> source, UserDTO destination, ResolutionContext context)
        {
            var dest = new UserDTO();

            string name = "";
            string discriminator = "";

            foreach (var claim in source)
            {
                switch (claim.Type)
                {
                    case ClaimTypes.NameIdentifier: 
                        dest.Id = claim.Value; break;
                    case ClaimTypes.Name: 
                        name = claim.Value; break;
                    case Claims.Discriminator:
                        discriminator = claim.Value; break;
                    case Claims.AvatarUrl: 
                        dest.Avatar = claim.Value; break;
                    case CustomClaimTypes.Guilds:
                        dest.Guilds = claim.Value; break;
                    case CustomClaimTypes.IsAdmin:
                        dest.IsAdmin = bool.Parse(claim.Value); break;
                }
            }

            dest.Username = name + "#" + discriminator;

            return dest;
        }
    }
}