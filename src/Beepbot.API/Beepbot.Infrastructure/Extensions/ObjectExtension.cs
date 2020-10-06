using System.Collections.Generic;
using System.Linq;

namespace Beepbot.Infrastructure.Extensions
{
    public static class ObjectExtensions
    {
        public static bool IsNullOrEmpty<T>(this IEnumerable<T> enumerable)
            where T : class
        {
            return enumerable == null || !enumerable.Any();
        }       

        public static bool IsNullOrWhiteSpace(this string str)            
        {
            return string.IsNullOrWhiteSpace(str);
        }

        public static bool IsNull<T>(this T obj)
            where T : class
        {
            return obj == null;
        }

        public static bool IsZeroOrLess(this long obj)            
        {
            return obj <= 0;
        }

        public static bool IsNotNull<T>(this T obj)
            where T : class
        {
            return obj != null;
        }
    }
}
