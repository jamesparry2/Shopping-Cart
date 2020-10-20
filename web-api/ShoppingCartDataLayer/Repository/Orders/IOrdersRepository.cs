using ShoppingCartDataLayer.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ShoppingCartDataLayer.Repository.Orders
{
    public interface IOrdersRepository
    {
        bool PostOrder(IEnumerable<Order> orders);
        IEnumerable<Order> GetOrders();
    }
}
