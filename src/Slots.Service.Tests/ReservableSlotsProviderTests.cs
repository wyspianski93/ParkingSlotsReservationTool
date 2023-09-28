using FluentAssertions;
using Slots.Service.Models;
using Xunit;

namespace Slots.Service.Tests
{
    public class ReservableSlotsProviderTests
    {
        private readonly IReservableSlotsProvider _reservableSlotsProvider;

        private readonly IReadOnlyCollection<Slot> _slots;

        public ReservableSlotsProviderTests()
        {
            _slots = new List<Slot>()
            {
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "A1",
                    AvailabilityPeriods = new List<AvailabilityPeriod>()
                    {
                        new()
                        {
                            From = new DateOnly(2022, 1, 1),
                            To = new DateOnly(2022, 1, 3)
                        }
                    },
                    Reservations = new List<Reservation>()
                    {
                        new()
                        {
                            ReservationPeriod = new()
                            {
                                From = new DateOnly(2022, 1, 2),
                                To = new DateOnly(2022, 1, 2)
                            }
                        }
                    }
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "A2",
                    AvailabilityPeriods = new List<AvailabilityPeriod>()
                    {
                        new()
                        {
                            From = new DateOnly(2022, 1, 5),
                            To = new DateOnly(2022, 1, 10)
                        }
                    },
                    Reservations = new List<Reservation>()
                    {
                        new()
                        {
                            ReservationPeriod = new()
                            {
                                From = new DateOnly(2022, 1, 7),
                                To = new DateOnly(2022, 1, 9)
                            }
                        }
                    }
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "A3",
                    AvailabilityPeriods = new List<AvailabilityPeriod>()
                    {
                        new()
                        {
                            From = new DateOnly(2022, 1, 3),
                            To = new DateOnly(2022, 1, 13)
                        }
                    },
                    Reservations = new List<Reservation>()
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "A4",
                    AvailabilityPeriods = new List<AvailabilityPeriod>()
                    {
                        new()
                        {
                            From = new DateOnly(2022, 1, 20),
                            To = new DateOnly(2022, 1, 25)
                        },
                        new()
                        {
                            From = new DateOnly(2022, 1, 27),
                            To = new DateOnly(2022, 1, 31)
                        }
                    },
                    Reservations = new List<Reservation>()
                    {
                        new()
                        {
                            ReservationPeriod = new()
                            {
                                From = new DateOnly(2022, 1, 21),
                                To = new DateOnly(2022, 1, 23)
                            },
                        },
                        new()
                        {
                            ReservationPeriod = new()
                            {
                                From = new DateOnly(2022, 1, 28),
                                To = new DateOnly(2022, 1, 30)
                            },
                        }
                    }
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "A5",
                    AvailabilityPeriods = new List<AvailabilityPeriod>()
                    {
                        new()
                        {
                            From = new DateOnly(2022, 2, 5),
                            To = new DateOnly(2022, 2, 10)
                        },
                        new()
                        {
                            From = new DateOnly(2022, 2, 12),
                            To = new DateOnly(2022, 2, 15)
                        }
                    }
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "A6",
                    AvailabilityPeriods = new List<AvailabilityPeriod>()
                    {
                        new()
                        {
                            From = new DateOnly(2022, 2, 2),
                            To = new DateOnly(2022, 2, 8)
                        },
                        new()
                        {
                            From = new DateOnly(2022, 2, 15),
                            To = new DateOnly(2022, 2, 26)
                        }
                    },
                    Reservations = new List<Reservation>()
                    {
                        new()
                        {
                            ReservationPeriod = new()
                            {
                                From = new DateOnly(2022, 2, 2),
                                To = new DateOnly(2022, 2, 3)
                            },
                        },
                        new()
                        {
                            ReservationPeriod = new()
                            {
                                From = new DateOnly(2022, 1, 16),
                                To = new DateOnly(2022, 1, 18)
                            },
                        },
                        new()
                        {
                            ReservationPeriod = new()
                            {
                                From = new DateOnly(2022, 1, 20),
                                To = new DateOnly(2022, 1, 22)
                            },
                        }
                    },
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "A7",
                    AvailabilityPeriods = new List<AvailabilityPeriod>()
                    {
                        new()
                        {
                            From = new DateOnly(2022, 2, 1),
                            To = new DateOnly(2022, 2, 25)
                        },
                    },
                    Reservations = new List<Reservation>()
                    {
                        new()
                        {
                            ReservationPeriod = new()
                            {
                                From = new DateOnly(2022, 2, 5),
                                To = new DateOnly(2022, 2, 5)
                            },
                        },
                        new()
                        {
                            ReservationPeriod = new()
                            {
                                From = new DateOnly(2022, 1, 10),
                                To = new DateOnly(2022, 1, 12)
                            },
                        },
                        new()
                        {
                            ReservationPeriod = new()
                            {
                                From = new DateOnly(2022, 1, 23),
                                To = new DateOnly(2022, 1, 25)
                            },
                        }
                    },
                },
            };

            _reservableSlotsProvider = new ReservableSlotsProvider();
        }

        [Theory]
        [InlineData("2022-01-01", "2022-01-01", 1, new string[] { "A1" })]
        [InlineData("2022-01-05", "2022-01-06", 2, new string[] { "A2", "A3" })]
        [InlineData("2022-01-20", "2022-01-21", 0, new string[] { })]
        [InlineData("2022-01-20", "2022-01-23", 0, new string[] { })]
        [InlineData("2022-01-20", "2022-01-20", 1, new string[] { "A4" })]
        [InlineData("2022-01-24", "2022-01-26", 0, new string[] { })]
        [InlineData("2022-01-27", "2022-01-27", 1, new string[] { "A4" })]
        [InlineData("2022-01-24", "2022-01-25", 1, new string[] { "A4" })]
        [InlineData("2022-02-08", "2022-02-09", 2, new string[] { "A5", "A7" })]
        [InlineData("2022-02-13", "2022-02-13", 2, new string[] { "A5", "A7" })]
        [InlineData("2022-02-20", "2022-02-20", 2, new string[] { "A6", "A7" })]
        [InlineData("2022-02-03", "2022-02-05", 0, new string[] { })]
        public void Should_return_correct_available_slots(string availableFrom, string availableTo, int expectedCount, string[] expectedNames)
        {
            var slots = _reservableSlotsProvider.GetReservableSlots(_slots, availableFrom, availableTo);

            slots.Should().HaveCount(expectedCount);
            slots.Select(slot => slot.Name).Should().BeEquivalentTo(expectedNames);
        }
    }
}
