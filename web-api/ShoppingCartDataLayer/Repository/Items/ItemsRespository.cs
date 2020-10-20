using Microsoft.EntityFrameworkCore;
using ShoppingCartDataLayer.Context;
using ShoppingCartDataLayer.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShoppingCartDataLayer.Repository.Items
{
    public class ItemsRespository : IItemsRepository
    {
        private DbSet<Item> _itemsContext;

        public ItemsRespository(DatabaseContext databaseContext)
        {
            _itemsContext = databaseContext.Items;
        }

        public IEnumerable<Item> GetItems()
        {
            return _itemsContext.Select(x => x).ToList();
        }

        public async Task<Item> GetItem(int id)
        {
            return await _itemsContext.FindAsync(id);
        }
    }
}
