namespace Beepbot.Domain.Entities
{
    public class UserToken
    {
        public long Id { get; set; }
        public string UserId { get; set; }
        public string Token { get; set; }
        public long Expiration { get; set; }        
    }
}
