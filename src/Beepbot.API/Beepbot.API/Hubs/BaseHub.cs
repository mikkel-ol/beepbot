using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

using Beepbot.Domain.Authorization;

namespace Beepbot.API.Hubs
{
    [Authorize(Policy = Policies.Hub)]
    public abstract class BaseHub : Hub
    {
    }
}