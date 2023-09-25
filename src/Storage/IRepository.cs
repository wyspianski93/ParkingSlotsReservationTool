using System.Linq.Expressions;

namespace Storage
{
    public interface IRepository
    {
        public Task<IReadOnlyCollection<TItem>> GetAllAsync<TItem>();

        public Task AddAsync<TItem>(TItem item);

        public Task<TItem> FindAsync<TItem>(Expression<Func<TItem, bool>> itemFinder);

        Task<IReadOnlyCollection<TItem>> FindAllAsync<TItem>(IReadOnlyCollection<IFilter<TItem>> filters);

        public Task UpdateOneAsync<TItem, TField>(Expression<Func<TItem, bool>> itemFinder,
            Expression<Func<TItem, TField>> fieldSelector, TField fieldValue);
    }
}