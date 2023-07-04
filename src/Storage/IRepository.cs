using System.Linq.Expressions;

namespace Storage
{
    public interface IRepository
    {
        public Task AddAsync<TItem>(TItem item);

        public Task<TItem> FindAsync<TItem>(Expression<Func<TItem, bool>> itemFinder);
    }
}