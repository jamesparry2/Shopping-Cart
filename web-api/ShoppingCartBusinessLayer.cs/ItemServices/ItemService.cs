using ShoppingCartBusinessLayer.DiscountService;
using ShoppingCartDataLayer.Models;
using ShoppingCartDataLayer.Repository.Items;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShoppingCartBusinessLayer.ItemServices
{
    public class ItemService : IItemServices
    {
        private readonly IItemsRepository _itemsRepository;
        private readonly IDiscountService _discountService;

        public ItemService(IItemsRepository itemsRepository, IDiscountService discountService)
        {
            _itemsRepository = itemsRepository;
            _discountService = discountService;
        }

        public IEnumerable<Item> GetItems()
        {
            return GetDiscountIfApplicable(_itemsRepository.GetItems());
        }

        public async Task<Item> GetItem(int id)
        {
            return await _itemsRepository.GetItem(id);
        }

        private IEnumerable<Item> GetDiscountIfApplicable(IEnumerable<Item> items)
        {
            return items.Select(item => new Item
            {
                Id = item.Id,
                Name = item.Name,
                Description = item.Description,
                Price = item.Price,
                Discount = _discountService.GetDiscount(item.DiscountId)
            });
        }
    }
}
