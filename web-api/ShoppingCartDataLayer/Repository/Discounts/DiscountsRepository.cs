using Microsoft.EntityFrameworkCore;
using ShoppingCartDataLayer.Context;
using ShoppingCartDataLayer.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShoppingCartDataLayer.Repository.Discounts
{
    public class DiscountsRepository : IDiscountsRepository
    {
        private DatabaseContext _discountsContext;

        public DiscountsRepository(DatabaseContext databaseContext)
        {
            _discountsContext = databaseContext;
        }

        public IEnumerable<Discount> GetDiscounts()
        {
            return _discountsContext.Discounts.Select(x => x).ToList();
        }

        public async Task<Discount> GetDiscount(int id)
        {
            return await _discountsContext.Discounts.FindAsync(id);
        }

        public Discount GetDiscount(int? id)
        {
            return _discountsContext.Discounts.Find(id);
        }

        public void UpdateBulkDiscounts(IEnumerable<Discount> discounts)
        {
            _discountsContext.UpdateRange(discounts);
            _discountsContext.SaveChanges();
        }
    }
}
