using ShoppingCartDataLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShoppingCartBusinessLayer.cs.OrderServices
{
    public interface IOrderServices
    {
        bool CreateOrders(IEnumerable<Item> items);
        IEnumerable<IGrouping<Guid?, Order>> GetOrders();
    }
}
