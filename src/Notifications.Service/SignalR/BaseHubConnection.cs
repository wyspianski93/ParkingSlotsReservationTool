using Microsoft.AspNetCore.SignalR.Client;
using Polly.Retry;
using Polly;
using Microsoft.IdentityModel.Tokens;
using Services.Common;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Notifications.Service.SignalR
{
    public interface IBaseHubConnection
    {
        HubConnection Connection { get; }

        Task StartConnection();

        Task InvokeAsync(string methodName, string message, string receiverId);
    }

    public class BaseHubConnection : IBaseHubConnection
    {
        private readonly ResiliencePipeline _resiliencePipeline;
        private readonly HubConnection _connection;

        public HubConnection Connection => _connection;

        public BaseHubConnection(string hubUrl, IJwtUtils jwtUtils)
        {
            _connection = new HubConnectionBuilder()
                .WithUrl(hubUrl, options =>
                {
                    options.AccessTokenProvider = () => Task.FromResult<string?>(jwtUtils.CreateToken(new List<Claim>()));
                })
                .Build();

            _resiliencePipeline = new ResiliencePipelineBuilder()
                .AddRetry(new RetryStrategyOptions()
                {
                    ShouldHandle = new PredicateBuilder().Handle<Exception>(),
                    Delay = TimeSpan.FromSeconds(5),
                    MaxRetryAttempts = 3,
                    OnRetry = (args) =>
                    {
                        Console.WriteLine($"Trying to reconnect to hub ({args.AttemptNumber + 1} attempt).");
                        return default;
                    },
                })
                .Build();

            StartConnection();
        }

        public async Task StartConnection()
        {
            Console.WriteLine($"Trying to connect to hub.");

            await _resiliencePipeline.ExecuteAsync(async cancellationToken =>
            {
                await _connection.StartAsync(cancellationToken).ConfigureAwait(false);
            }).ConfigureAwait(false);
        }

        public async Task InvokeAsync(string methodName, string message, string receiverId)
        {
            if (_connection.State != HubConnectionState.Connected)
            {
                await StartConnection().ConfigureAwait(false);
            }

            await _connection.InvokeAsync(methodName, message, receiverId).ConfigureAwait(false);
        }
    }
}
