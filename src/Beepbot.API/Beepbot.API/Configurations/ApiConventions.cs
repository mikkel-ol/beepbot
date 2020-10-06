using Beepbot.Domain.API;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using System.Diagnostics.CodeAnalysis;
using static Microsoft.AspNetCore.Http.StatusCodes;

namespace Beepbot.API.Configurations
{
    /// <summary>
    ///     Contains custom api conventions.
    /// </summary>
    [ExcludeFromCodeCoverage]
    public static class ApiConventions
    {
        #region GET

        [ProducesResponseType(Status200OK)]
        [ProducesResponseType(typeof(Error), Status404NotFound)]
        [ApiConventionNameMatch(ApiConventionNameMatchBehavior.Prefix)]
        public static void Get(
            [ApiConventionNameMatch(ApiConventionNameMatchBehavior.Suffix)]
            object id)
        {
        }

        [ProducesResponseType(Status200OK)]
        [ProducesResponseType(typeof(Error), Status404NotFound)]
        [ApiConventionNameMatch(ApiConventionNameMatchBehavior.Prefix)]
        public static void Get()
        {
        }

        [ProducesResponseType(Status200OK)]
        [ProducesResponseType(typeof(Error), Status404NotFound)]
        [ApiConventionNameMatch(ApiConventionNameMatchBehavior.Prefix)]
        public static void GetAll(
            [ApiConventionNameMatch(ApiConventionNameMatchBehavior.Any)]
            [ApiConventionTypeMatch(ApiConventionTypeMatchBehavior.Any)]
            object query)
        {
        }
        #endregion

        #region PUT

        [ProducesResponseType(Status204NoContent)]
        [ProducesResponseType(typeof(Error), Status400BadRequest)]
        [ProducesResponseType(typeof(Error), Status404NotFound)]
        [ApiConventionNameMatch(ApiConventionNameMatchBehavior.Prefix)]
        public static void Put()
        {
        }

        [ProducesResponseType(Status204NoContent)]
        [ProducesResponseType(typeof(Error), Status400BadRequest)]
        [ProducesResponseType(typeof(Error), Status404NotFound)]
        [ApiConventionNameMatch(ApiConventionNameMatchBehavior.Prefix)]
        public static void Put(
            [ApiConventionTypeMatch(ApiConventionTypeMatchBehavior.Any)]
            [ApiConventionNameMatch(ApiConventionNameMatchBehavior.Suffix)]
            object id,
            [ApiConventionNameMatch(ApiConventionNameMatchBehavior.Any)]
            [ApiConventionTypeMatch(ApiConventionTypeMatchBehavior.Any)]
            object dto)
        {
        }

        #endregion

        #region POST

        [ProducesResponseType(Status200OK)]
        [ProducesResponseType(Status201Created)]
        [ProducesResponseType(typeof(Error), Status400BadRequest)]
        [ApiConventionNameMatch(ApiConventionNameMatchBehavior.Prefix)]
        public static void Post()
        {
        }

        [ProducesResponseType(Status200OK)]
        [ProducesResponseType(Status201Created)]
        [ProducesResponseType(typeof(Error), Status400BadRequest)]
        [ApiConventionNameMatch(ApiConventionNameMatchBehavior.Prefix)]
        public static void Post(
            [ApiConventionNameMatch(ApiConventionNameMatchBehavior.Any)]
            [ApiConventionTypeMatch(ApiConventionTypeMatchBehavior.Any)]
            object dto)
        {
        }

        [ProducesResponseType(Status201Created)]
        [ProducesResponseType(typeof(Error), Status400BadRequest)]
        [ApiConventionNameMatch(ApiConventionNameMatchBehavior.Prefix)]
        public static void Post(
            [ApiConventionTypeMatch(ApiConventionTypeMatchBehavior.Any)]
            object id,
            [ApiConventionNameMatch(ApiConventionNameMatchBehavior.Any)]
            [ApiConventionTypeMatch(ApiConventionTypeMatchBehavior.Any)]
            object dto)
        {
        }

        #endregion

        #region Delete


        [ProducesResponseType(Status200OK)]
        [ProducesResponseType(Status202Accepted)]
        [ProducesResponseType(Status204NoContent)]
        [ProducesResponseType(typeof(Error), Status400BadRequest)]
        [ApiConventionNameMatch(ApiConventionNameMatchBehavior.Prefix)]
        public static void Delete(
            [ApiConventionTypeMatch(ApiConventionTypeMatchBehavior.Any)]
            [ApiConventionNameMatch(ApiConventionNameMatchBehavior.Suffix)]
            object id)
        {
        }
        #endregion
    }
}
