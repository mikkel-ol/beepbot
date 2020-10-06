namespace Beepbot.Domain.Models
{
    /// <summary>
    ///     A Model for an Email Message
    /// </summary>
    public class EmailMessage
    {
        /// <summary>
        ///     The email address of the sender
        /// </summary>
        public string SenderEmail { get; set; }

        /// <summary>
        ///     The email address of the receiver
        /// </summary>
        public string ReceiverEmail { get; set; }

        /// <summary>
        ///     The subject of the email
        /// </summary>
        public string Subject { get; set; }

        /// <summary>
        ///     The body of the email
        /// </summary>
        public string Body { get; set; }
    }
}
