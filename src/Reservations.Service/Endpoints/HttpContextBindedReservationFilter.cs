using Reservations.Service.Filtering;
using Reservations.Service.Models;
using System.Reflection;
using Reservations.Service.Attributes;

namespace Reservations.Service.Endpoints
{
    public class HttpContextBindedReservationFilter : IBindableFromHttpContext<HttpContextBindedReservationFilter>
    {
        public IReadOnlyCollection<IFilter> Filters { get; set; }

        public static ValueTask<HttpContextBindedReservationFilter> BindAsync(HttpContext context, ParameterInfo parameter)
        {
            var filterablesFromAttributes = typeof(Reservation)
                .GetProperties()
                .SelectMany(propertyInfo => propertyInfo.GetCustomAttributes<Filterable>())
                .Select(attributeFilterable => attributeFilterable.Key);

            foreach (var paramKey in context.Request.Query.Keys)
            {
                if (!filterablesFromAttributes.Contains(paramKey))
                {
                    throw new NotImplementedException($"Filtering by {paramKey} is not supported.");
                }
            }

            var filters = filterablesFromAttributes.Where(filterable =>
                {
                    string? value = context.Request.Query[filterable];
                    return value != null;
                })
                .Select(filterable => new Filter() { Key = filterable, Value = context.Request.Query[filterable] })
                .ToList();

            return ValueTask.FromResult(new HttpContextBindedReservationFilter() { Filters = filters });
        }
    }
}
