using Microsoft.AspNetCore.Mvc;

using AutoMapper;

namespace Beepbot.API.Controllers.Users
{
    public class UsersController : ApiController
    {
        private readonly IMapper mapper;

        public UsersController(IMapper mapper)
        {
            this.mapper = mapper;
        }

        /// <summary>
        ///     User endpoint
        /// </summary>
        /// <returns>User DTO with information</returns>
        [HttpGet("@me")]
        public ActionResult<UserDTO> GetMe()
        {
            var user = mapper.Map<UserDTO>(User?.Claims);

            return Ok(user);
        }
    }
}