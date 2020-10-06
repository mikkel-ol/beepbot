using Microsoft.IdentityModel.Tokens;
using System;

namespace Beepbot.Domain.Authentication
{
    public class JwtIssuerOptions
    {
        public string Issuer { get; set; }

        public string Subject { get; set; }

        public string Audience { get; set; }

        public DateTimeOffset Expiration => IssuedAt.Add(ValidFor);

        public DateTimeOffset NotBefore => DateTimeOffset.UtcNow;

        public DateTimeOffset IssuedAt => DateTimeOffset.UtcNow;

        public TimeSpan ValidFor { get; set; } = TimeSpan.FromMinutes(3);

        public Func<string> JtiGenerator => () => Guid.NewGuid().ToString();

        public SigningCredentials SigningCredentials { get; set; }
    }
}
