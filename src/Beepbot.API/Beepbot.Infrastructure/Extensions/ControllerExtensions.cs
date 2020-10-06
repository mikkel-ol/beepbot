using System;

namespace Beepbot.Infrastructure.Extensions
{
    public static class ControllerExtensions
    {
        public static string ControllerName(this Type controller)
        {
            var name = controller.Name;

            return name.Replace("Controller", string.Empty);
        }
    }
}
