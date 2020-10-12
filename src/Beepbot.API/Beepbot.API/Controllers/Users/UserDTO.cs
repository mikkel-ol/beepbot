namespace Beepbot.API.Controllers.Users
{
    public class UserDTO
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Avatar { get; set; }
        public bool IsAdmin { get; set; }
        public string Guilds { get; set; }
    }
}