using System.Collections.Generic;
using System.Security.Claims;

using AutoMapper;

namespace Beepbot.API.Controllers.Users
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<IEnumerable<Claim>, UserDTO>()
                .ConvertUsing<ClaimConverter>();
        }
    }
}