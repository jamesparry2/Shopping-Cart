using ShoppingCartDataLayer.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ShoppingCartBusinessLayer.DiscountService
{
    public interface IDiscountService
    {
        IEnumerable<Discount> GetDiscounts();
        Task<Discount> GetDiscount(int id);
        Discount GetDiscount(int? discountId);
        bool PutDiscounts(IEnumerable<Discount> discounts);
    }
}
