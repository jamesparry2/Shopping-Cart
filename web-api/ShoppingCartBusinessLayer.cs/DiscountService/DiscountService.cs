using ShoppingCartDataLayer.Models;
using ShoppingCartDataLayer.Repository.Discounts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShoppingCartBusinessLayer.DiscountService
{
    public class DiscountService : IDiscountService
    {
        private readonly IDiscountsRepository _discountsRepository;

        public DiscountService(IDiscountsRepository discountsRepository)
        {
            _discountsRepository = discountsRepository;
        }

        public IEnumerable<Discount> GetDiscounts()
        {
            return _discountsRepository.GetDiscounts();
        }

        public async Task<Discount> GetDiscount(int id)
        {
            return await _discountsRepository.GetDiscount(id);
        }

        public Discount GetDiscount(int? id)
        {
            return _discountsRepository.GetDiscount(id);
        }

        public bool PutDiscounts(IEnumerable<Discount> discounts)
        {
            try
            {
                _discountsRepository.UpdateBulkDiscounts(ModifyDiscounts(discounts));
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public IEnumerable<Discount> ModifyDiscounts(IEnumerable<Discount> discounts)
        {
            return discounts.
                Select(discount => 
                    discount.HasBeenApplied != null && (bool) discount.HasBeenApplied ?
                        new Discount
                        {
                            HasBeenApplied = discount.HasBeenApplied,
                            Percentage = discount.Percentage,
                            HasBeenUsed = true,
                            Id = discount.Id
                        } : discount
                    );
        }
    }
}
