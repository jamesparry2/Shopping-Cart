using ShoppingCartBusinessLayer.DiscountService;
using ShoppingCartDataLayer.Models;
using ShoppingCartDataLayer.Repository.Orders;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ShoppingCartBusinessLayer.cs.OrderServices
{
    public class OrderServices : IOrderServices
    {
        private readonly IOrdersRepository _ordersRepository;
        private readonly IDiscountService _discountService;

        public OrderServices(IOrdersRepository ordersRepository, IDiscountService discountService)
        {
            _ordersRepository = ordersRepository;
            _discountService = discountService;
        }

        public IEnumerable<IGrouping<Guid?, Order>> GetOrders()
        {
            var hello = _ordersRepository.GetOrders().ToList().GroupBy(order => order.Id);
            return hello;
        }

        public bool CreateOrders(IEnumerable<Item> items)
        {
            try
            {
                var orders = _ordersRepository.PostOrder(GenerateOrders(items));
                if(orders)
                {
                    var discounts = items.Select(item => item.Discount).ToList().FindAll(element => element != null);
                    _discountService.PutDiscounts(discounts);
                }
                return true;

            } catch (Exception e)
            {
                // Would implement logging with the exception for debuging for Live
                return false;
            }
        }

        private IEnumerable<Order> GenerateOrders(IEnumerable<Item> items)
        {
            return items.Select(
                item => new Order
                {
                    Id = Guid.NewGuid(),
                    ItemId = item.Id,
                }
           );
        }
    }
}
