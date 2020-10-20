using ShoppingCartDataLayer.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ShoppingCartBusinessLayer.ItemServices
{
    public interface IItemServices
    {
        IEnumerable<Item> GetItems();
        Task<Item> GetItem(int id);
    }
}
