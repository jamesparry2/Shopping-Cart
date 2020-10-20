using Microsoft.EntityFrameworkCore;
using ShoppingCartDataLayer.Context;
using ShoppingCartDataLayer.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ShoppingCartDataLayer.Repository.Orders
{
    public class OrderRepository : IOrdersRepository
    {
        private readonly DatabaseContext _databaseContext;

        public OrderRepository(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public IEnumerable<Order> GetOrders()
        {
            return _databaseContext.Orders;
        }

        // public 

        public bool PostOrder(IEnumerable<Order> orders)
        {
            try
            {
                _databaseContext.Orders.AddRange(orders);
                _databaseContext.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;   
            }
        }

    }
}
