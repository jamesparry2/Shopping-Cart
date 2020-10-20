using System;
using System.Collections.Generic;
using System.Text;

namespace ShoppingCartDataLayer.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int? DiscountId { get; set; }
        public Discount Discount { get; set; }
    }
}
