using System.Linq.Expressions;

namespace Storage
{
    public interface IRepository
    {
        public Task AddAsync<TItem>(TItem item);

        public Task<TItem> FindAsync<TItem>(Expression<Func<TItem, bool>> itemFinder);

        public Task UpdateOneAsync<TItem, TField>(Expression<Func<TItem, bool>> itemFinder,
            Expression<Func<TItem, TField>> fieldSelector, TField fieldValue);
    }
}