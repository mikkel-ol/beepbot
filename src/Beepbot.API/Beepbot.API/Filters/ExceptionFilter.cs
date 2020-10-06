using System;
using System.Linq;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using Beepbot.Domain.API;
using Beepbot.Infrastructure.Exceptions;

using FluentValidation;
using FluentValidation.Results;

namespace Beepbot.API.Filters
{
    /// <summary>
    ///     Exception filter for the API.
    ///     Exceptions that should be processed and returned in a different format should be handled here.
    /// </summary>
    public class ExceptionFilter : IExceptionFilter
    {
        private readonly IHostEnvironment environment;
        private readonly ILogger<ExceptionFilter> logger;

        public ExceptionFilter(IHostEnvironment environment, ILogger<ExceptionFilter> logger)
        {
            this.environment = environment;
            this.logger = logger;
        }

        public void OnException(ExceptionContext context)
        {
            switch (context.Exception)
            {
                case NotFoundException exception:
                    context.Result = new ErrorResult(StatusCodes.Status404NotFound, nameof(NotFoundException),
                        exception.Message);
                    break;

                case ForbiddenException exception:
                    context.Result = new ErrorResult(StatusCodes.Status403Forbidden, nameof(ForbiddenException),
                        exception.Message);
                    break;

                case ValidationException exception:
                    var message = exception.Errors.Any()
                        ? new ValidationResult(exception.Errors).ToString()
                        : exception.Message;

                    context.Result = new ErrorResult(StatusCodes.Status400BadRequest, nameof(ValidationException),
                        message);
                    break;

                default:
                    if (environment.IsDevelopment())
                    {
                        return;
                    }

                    Console.Error.WriteLine(context.Exception.Message);
                    Console.Error.WriteLine(context.Exception.InnerException);

                    logger?.LogError("Internal server error: {@exception}", context.Exception);

                    context.Result = new ErrorResult(StatusCodes.Status500InternalServerError, nameof(Exception),
                        "Internal server error, contact an administrator");
                    break;
            }
        }

        /// <summary>
        ///     Error result for returning errors with a message.
        /// </summary>
        private class ErrorResult : ObjectResult
        {
            public ErrorResult(int status, string type, string message) : base(new Error
            {
                Status = status,
                Type = type,
                Message = message
            })
            {
                StatusCode = status;
            }
        }
    }
}
