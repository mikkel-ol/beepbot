﻿using System.Threading;
using System.Threading.Tasks;

using FluentValidation;

using MediatR;

namespace Beepbot.Infrastructure.MediatrPipeline
{
    public class ValidationMediatrPipeline<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    {
        private readonly IValidator<TRequest> _validator;

        public ValidationMediatrPipeline(IValidator<TRequest> validator = null)
        {
            _validator = validator;
        }

        public async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken,
            RequestHandlerDelegate<TResponse> next)
        {
            if (_validator == null)
            {
                return await next();
            }

            var result = await _validator.ValidateAsync(request, cancellationToken);

            if (!result.IsValid)
            {
                throw new ValidationException(result.Errors);
            }

            return await next();
        }
    }
}
