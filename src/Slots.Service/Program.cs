using EventBus;
using Slots.Service;
using Slots.Service.Events;
using Slots.Service.EventsHandlers;

var builder = Host.CreateDefaultBuilder(args);

builder.ConfigureWebHostDefaults(webBuilder =>
{
    webBuilder.UseStartup<Startup>();
});

var app = builder.Build();

using var scope = app.Services.CreateScope();
var eventBus = scope.ServiceProvider.GetRequiredService<IEventBus>();

eventBus.Subscribe<ReservationCreatedEvent, ReservationCreatedEventHandler>();

app.Run();