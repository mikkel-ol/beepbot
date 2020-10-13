namespace Beepbot.Infrastructure.Extensions
{
    public static class StringExtension
    {
        public static string TrimChannelType(this string channelType)
        {
            return channelType.Remove(channelType.IndexOf("channel"));
        }
    }
}