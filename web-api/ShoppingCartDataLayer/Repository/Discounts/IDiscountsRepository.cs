using ShoppingCartDataLayer.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ShoppingCartDataLayer.Repository.Discounts
{
    public interface IDiscountsRepository
    {
        IEnumerable<Discount> GetDiscounts();
        Task<Discount> GetDiscount(int id);
        Discount GetDiscount(int? id);
        void UpdateBulkDiscounts(IEnumerable<Discount> discounts);
    }
}
