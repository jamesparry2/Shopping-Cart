using ShoppingCartDataLayer.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ShoppingCartDataLayer.Repository.Items
{
    public interface IItemsRepository
    {
        IEnumerable<Item> GetItems();
        Task<Item> GetItem(int id);
    }
}
