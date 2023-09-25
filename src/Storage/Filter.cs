using System.Linq.Expressions;

namespace Storage
{
    public interface IFilter<TItem>
    {
        Expression<Func<TItem, object>> FieldSelector { get; set; }

        object FieldValue { get; set; }
    }

    public class Filter<TItem> : IFilter<TItem>
    {
        public Expression<Func<TItem, object>> FieldSelector { get; set; }

        public object FieldValue { get; set; }
    }
}
