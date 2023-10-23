
using EventBus;
using Notifications.Service;
using Notifications.Service.Events;
using Notifications.Service.EventsHandlers;
using Notifications.Service.SignalR;

var builder = Host.CreateDefaultBuilder(args);

builder.ConfigureWebHostDefaults(webBuilder =>
{
    webBuilder.UseStartup<Startup>();
});

var app = builder.Build();

using var scope = app.Services.CreateScope();
var eventBus = scope.ServiceProvider.GetRequiredService<IEventBus>();
//var notificationsHubConnection = scope.ServiceProvider.GetRequiredService<INotificationsHubConnection>();

eventBus.Subscribe<ReservationCreatedEvent, ReservationCreatedEventHandler>();

app.Run();