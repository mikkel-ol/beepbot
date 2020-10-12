using System;

namespace Beepbot.Infrastructure.Exceptions
{
    public class GuildExistsException : Exception
    {
        public GuildExistsException()
        {
        }

        public GuildExistsException(string message) : base(message)
        {
        }

        public GuildExistsException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
