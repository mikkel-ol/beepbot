using System;

namespace Beepbot.Infrastructure.Exceptions
{
    public class RabbitMqException : Exception
    {
        public RabbitMqException()
        {
        }

        public RabbitMqException(string message) : base(message)
        {
        }

        public RabbitMqException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
